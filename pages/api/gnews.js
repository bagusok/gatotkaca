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

  //   if (!req.headers['x-csrf-token'] || req.headers['x-csrf-token'].length !== 32)
  //     return res
  //       .status(405)
  //       .json({ status: 'failed', message: 'Metode tidak valid bang.' });

  //   if (!req.query.q)
  //     return res
  //       .status(405)
  //       .json({ status: 'failed', message: 'Query tidak boleh kosong.' });

  const cheerio = require('cheerio');
  const axios = require('axios');

  const searchString = 'Berita+hari ini'; // what we want to search
  const encodedString = encodeURI(searchString); // what we want to search for in URI encoding

  const AXIOS_OPTIONS = {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
    }, // adding the User-Agent header as one way to prevent the request from being blocked
    params: {
      q: encodedString, // our encoded search string
      tbm: 'nws', // parameter defines the type of search you want to do ("nws" means news)
      hl: 'id', // Parameter defines the language to use for the Google search
      gl: 'ID',
      start: 2, // parameter defines the country to use for the Google search
    },
  };

  function getNewsInfo() {
    return axios
      .get(`http://google.com/search`, AXIOS_OPTIONS)
      .then(function ({ data }) {
        let $ = cheerio.load(data);

        const pattern = /s='(?<img>[^']+)';\w+\s\w+=\['(?<id>\w+_\d+)'];/gm;
        const images = [...data.matchAll(pattern)].map(({ groups }) => ({
          id: groups.id,
          img: groups.img.replace('\\x3d', ''),
        }));

        const allNewsInfo = Array.from($('.WlydOe')).map((el) => {
          return {
            link: $(el).attr('href'),
            source: $(el).find('.CEMjEf span').text().trim(),
            title: $(el).find('.nDgy9d').text().trim().replace('\n', ''),
            snippet: $(el).find('.GI74Re').text().trim().replace('\n', ''),
            image:
              images.find(
                ({ id, img }) => id === $(el).find('.uhHOwf img').attr('id')
              )?.img || 'No image',
            date: $(el).find('.ZE0LJd span').text().trim(),
          };
        });

        return allNewsInfo;
      });
  }

  getNewsInfo().then((resp) => {
    return res.status(200).json(resp);
  });
  //   googleNewsAPI.getNews(
  //     googleNewsAPI.SEARCH,
  //     'bayu',
  //     'id-ID',
  //     (err, response) => {
  //       return res.status(200).json(response);
  //     }
  //   );
}
