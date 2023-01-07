import * as yt from 'youtube-search-without-api-key';
import { search } from 'youtube-search-no-limit';
const bing = require('bing-scraper');
import NextCors from 'nextjs-cors';

import google from 'googlethis';

export default async function handler(req, res) {
  // const videos = await yt.search('Rafi Ahmad');
  // await NextCors(req, res, {
  //   // Options
  //   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  //   origin: '*',
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // });

  const options = {
    page: 0,
    safe: true,
    additional_params: {
      hl: 'id',
    },
  };

  const videos = await google.search(req.query.q, options);
  return res.status(200).json(videos);

  //   bing.search(
  //     {
  //       q: 'Sandika galih',
  //       enforceLanguage: true,
  //     },
  //     function (err, resp) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(resp);
  //         return res.status(200).json(resp);
  //       }
  //     }
  //   );
}
