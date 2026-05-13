import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createChat,
  getChatHistory,
  getChat,
  sendMessage,
  deleteChat,
  updateChatTitle,
} from '../controllers/chatController';

const router = Router();

router.use(authenticate);

router.post('/', createChat);
router.get('/', getChatHistory);
router.get('/:chatId', getChat);
router.post('/:chatId/messages', sendMessage);
router.delete('/:chatId', deleteChat);
router.put('/:chatId/title', updateChatTitle);

export default router;
