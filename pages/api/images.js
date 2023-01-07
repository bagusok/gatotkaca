import google from 'googlethis';

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return res
      .status(405)
      .json({ status: 'failed', message: 'Metode tidak valid.' });

  if (!req.headers['x-csrf-token'] || req.headers['x-csrf-token'].length !== 32)
    return res
      .status(405)
      .json({ status: 'failed', message: 'Metode tidak valid bang.' });

  if (!req.query.q)
    return res
      .status(404)
      .json({ status: 'failed', message: 'Query tidak boleh kosong.' });

  const searchQuery = req.query.q;
  const response = await google.image(searchQuery, { safe: false });

  return res.status(200).json({
    status: 'success',
    results: response,
  });
}
