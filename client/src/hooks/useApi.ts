import { useState, useCallback } from 'react';
import axios from 'axios';
import { useUI } from '../context/UIContext';

interface UseFetchOptions {
  showError?: boolean;
}

export const useFetch = <T,>(url: string, options: UseFetchOptions = {}) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useUI();

  const fetch = useCallback(
    async (fetchOptions: Record<string, unknown> = {}) => {
      setLoading(true);

      setError(null);
      try {
        const response = await axios.get(url, { ...fetchOptions });
        setData(response.data);
        return response.data;
      } catch (err: any) {
        const message = err.response?.data?.message || 'An error occurred';
        setError(message);
        if (options.showError) {
          addToast(message, 'error');
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, options.showError, addToast]
  );

  return { data, loading, error, fetch };
};

export const usePost = <T, R = unknown>(url: string, options: UseFetchOptions = {}) => {

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useUI();

  const post = useCallback(
    async (payload: R) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(url, payload);
        setData(response.data);
        return response.data;
      } catch (err: any) {
        const message = err.response?.data?.message || 'An error occurred';
        setError(message);
        if (options.showError) {
          addToast(message, 'error');
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, options.showError, addToast]
  );

  return { data, loading, error, post };
};

export const usePut = <T, R = unknown>(url: string, options: UseFetchOptions = {}) => {

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useUI();

  const put = useCallback(
    async (payload: R) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.put(url, payload);
        setData(response.data);
        return response.data;
      } catch (err: any) {
        const message = err.response?.data?.message || 'An error occurred';
        setError(message);
        if (options.showError) {
          addToast(message, 'error');
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, options.showError, addToast]
  );

  return { data, loading, error, put };
};

export const useDelete = (url: string, options: UseFetchOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useUI();

  const delete_ = useCallback(
    async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.delete(url);
        return response.data;
      } catch (err: any) {
        const message = err.response?.data?.message || 'An error occurred';
        setError(message);
        if (options.showError) {
          addToast(message, 'error');
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, options.showError, addToast]
  );

  return { loading, error, delete: delete_ };
};
