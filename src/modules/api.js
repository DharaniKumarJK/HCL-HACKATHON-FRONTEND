const normalizeBaseUrl = (baseUrl) => baseUrl.replace(/\/+$/, '');

const request = async (baseUrl, path, options = {}) => {
  const url = `${normalizeBaseUrl(baseUrl)}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
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

export const login = (baseUrl, payload) =>
  request(baseUrl, '/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const register = (baseUrl, payload) =>
  request(baseUrl, '/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const listProducts = (baseUrl) => request(baseUrl, '/api/products');
