export const login = async (client, { email, password }) =>
  client.request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const register = async (client, payload) =>
  client.request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
