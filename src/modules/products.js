export const listProducts = async (client) => client.request('/api/products');

export const createProduct = async (client, payload) =>
  client.request('/api/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
