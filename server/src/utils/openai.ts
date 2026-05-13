type ChatRole = 'system' | 'user' | 'assistant';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
// Ollama model tag (example: "medgemma:4b")
// You can set this in server/.env as: OLLAMA_MODEL=medgemma:4b
// Default model tag used if you don't provide OLLAMA_MODEL.
// NOTE: Your local Ollama may expose a different tag; this is just a fallback.
const DEFAULT_OLLAMA_MODEL = 'medgemma:4b';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || DEFAULT_OLLAMA_MODEL;

if (!process.env.OLLAMA_MODEL) {
  console.warn(`[Ollama] OLLAMA_MODEL not set. Using default: ${DEFAULT_OLLAMA_MODEL}`);
}

// Log the effective config on startup (helps debugging “model not found”).
console.log(
  '[Ollama] base_url=',
  OLLAMA_BASE_URL,
  'process.env.OLLAMA_MODEL=',
  process.env.OLLAMA_MODEL,
  'effective model=',
  OLLAMA_MODEL
);

const safeJsonParse = async (res: Response): Promise<any | null> => {
  try {
    const text = await res.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const getOllamaTags = async (): Promise<{ models?: Array<{ name?: string }> } | null> => {
  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.warn(`[Ollama] /api/tags failed (${res.status}): ${text}`);
      return null;
    }

    return (await res.json()) as any;
  } catch (err) {
    console.warn('[Ollama] /api/tags request failed:', err);
    return null;
  }
};

// Minimal Ollama client (non-streaming)
export const generateChatResponse = async (
  messages: Array<{ role: ChatRole; content: string }>,
  therapyType = 'supportive'
) => {
  const systemPrompt = getSystemPrompt(therapyType);

  // Ollama's /api/chat expects a single `system` message separately.
  const userAssistantMessages = messages
    .filter((m) => m.role !== 'system')
    .map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    }));

  const payload = {
    model: OLLAMA_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      ...userAssistantMessages,
    ],
    options: {
      temperature: 0.7,
      num_predict: 500,
    },
    stream: false,
  };

  // Optional preflight: helps identify “model not found” quickly.
  try {
    const tags = await getOllamaTags();
    const modelExists = tags?.models?.some((m) => m?.name === OLLAMA_MODEL);
    if (!modelExists) {
      console.warn(
        `[Ollama] Model '${OLLAMA_MODEL}' not found in /api/tags. Available: ${(tags?.models || [])
          .map((m) => m?.name)
          .filter(Boolean)
          .join(', ') || 'none'}`
      );
    }
  } catch {
    // ignore preflight failures
  }

  const url = `${OLLAMA_BASE_URL}/api/chat`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // IMPORTANT: read body only once and log it.
    const parsed = await safeJsonParse(res);
    if (parsed) {
      throw new Error(
        `Failed to generate response from Ollama (${res.status}) ${url}. Model='${OLLAMA_MODEL}'. Response=${JSON.stringify(
          parsed
        )}`
      );
    }

    const text = await res.text().catch(() => '');
    throw new Error(
      `Failed to generate response from Ollama (${res.status}) ${url}. Model='${OLLAMA_MODEL}'. ResponseText=${text}`
    );
  }

  const data: any = await res.json();
  // Ollama returns: { message: { role, content }, ... }
  return data?.message?.content || '';
};

const getSystemPrompt = (therapyType: string): string => {
  const basePrompt = `You are Mently, a compassionate and empathetic AI mental health chatbot. You provide support, guidance, and coping strategies for people dealing with mental health challenges. 

Guidelines:
- Always be respectful, non-judgmental, and supportive
- Listen actively and validate the person's feelings
- Provide evidence-based coping strategies when appropriate
- Encourage professional help if the person expresses severe distress or suicidal thoughts
- Be honest about your limitations as an AI
- Never diagnose or prescribe medications`;

  const therapySpecific: { [key: string]: string } = {
    cognitive: `\n\nFocus on: Cognitive restructuring, identifying negative thought patterns, and building positive coping mechanisms.`,
    mindfulness: `\n\nFocus on: Mindfulness techniques, breathing exercises, present-moment awareness, and meditation.`,
    general: `\n\nFocus on: General support, listening, validation, and suggesting healthy coping strategies.`,
  };

  return basePrompt + (therapySpecific[therapyType] || therapySpecific['general']);
};
