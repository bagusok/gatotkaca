import googleNewsAPI from 'google-news-json';
import {
  searchGoogleNews,
  searchGoogleNewsTopics,
} from 'neo-scraper-google-news';

export default async function handler(req, res) {
  //   let news = await googleNewsAPI.getNews(googleNewsAPI.TOP_NEWS, null, 'id-ID');

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
      .status(405)
      .json({ status: 'failed', message: 'Query tidak boleh kosong.' });

  try {
    const news = await searchGoogleNews({
      searchTerm: encodeURI(req.query.q),
      shouldFetchPrettyUrls: false,
      shouldFetchOGData: false,
      queryVars: {
        hl: 'id-ID',
        gl: 'ID',
        ceid: 'ID:id',
      },
      timeframe: '1d',
    });

    return res.status(200).json({ status: 'success', results: news });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Error.' });
  }

  //   googleNewsAPI.getNews(
  //     googleNewsAPI.SEARCH,
  //     'bayu',
  //     'id-ID',
  //     (err, response) => {
  //       return res.status(200).json(response);
  //     }
  //   );
}
