const normalizeBaseUrl = (baseUrl) => baseUrl.replace(/\/+$/, '');

export const createClient = ({ baseUrl, token }) => {
  const root = normalizeBaseUrl(baseUrl || '');

  const request = async (path, options = {}) => {
    const url = `${root}${path.startsWith('/') ? '' : '/'}${path}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const error = new Error('Request failed');
      error.status = response.status;
      error.payload = payload;
      throw error;
    }

    return payload;
  };

  return { request };
};
