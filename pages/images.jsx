/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';
import YNTKTS from '../components/YNTKTS';
import Footer from '../components/Footer';
import User from '../components/User';
import HeadMeta from '../components/Head';
import { event } from '../lib/ga';
import ImageResults from '../components/ImagesResult';
import randomString from '../lib/randomString';

export function getServerSideProps(ctx) {
  const query = ctx.req;

  return { props: { a: 'a' } };
}

export default function search(props) {
  const router = useRouter();

  const { q, page } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState(q || 'bunga');

  const getSearch = async () => {
    let get = await fetch(`/api/images?q=${q}&page=${page || 0}`, {
      method: 'GET',
      headers: {
        'X-CSRF-TOKEN': randomString(32).toString(),
      },
    });
    let res = await get.json();
    return res;
  };

  useEffect(() => {
    if (!q) {
      router.push('/');
    }
    setIsLoading(true);
    getSearch().then((res, err) => {
      if (res.status === 'success') {
        setSearch(res);
        setIsLoading(false);
      } else {
        setSearch({ reults: '' });
        setIsLoading(false);
      }
    });
  }, [router]);

  const handleSearch = (e) => {
    e.preventDefault();
    event({
      action: 'search3',
      params: {
        search_term: input,
      },
    });
    router.push({ query: { q: input } });
  };

  return (
    <>
      <HeadMeta title={q + ' | Gatotkaca Search'} />
      <div className="min-h-screen flex flex-col justify-between px-3 md:px-[2rem] py-6">
        <div>
          <div className="flex flex-col md:flex-row justify-between gap-6 text-center items-center  w-full">
            <div className="form-group flex flex-col md:flex-row items-center gap-4 md:gap-12 relative w-full">
              <Link href="/" passHref>
                <a href="#" className="text-2xl font-semibold text-orange-400">
                  Gatot Kaca
                </a>
              </Link>
              <form
                onSubmit={(e) => handleSearch(e)}
                className="w-full md:w-2/3 relative"
              >
                <input
                  type="text"
                  className="h-12 w-full pl-5 pr-[3rem] py-2 bg-white rounded-full text-sm border border-slate-200 shadow-md focus:border focus:border-slate-500 focus:outline-none"
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                />
                <button
                  type="submit"
                  className="text-blue-700 absolute right-4 text-2xl b bottom-3 hover:text-blue-200"
                >
                  <FiSearch />
                </button>
              </form>
            </div>
            <User />
          </div>
          <div className="flex flex-row gap-6 text-sm mt-7 border-b border-slate-200">
            <a href={`/search?q=${q}&page=1`} className="text-slate-400">
              Semua
            </a>
            <a href="#" className="border-b-2 border-slate-500">
              Gambar
            </a>
            <a href={`/news?q=${q}&page=1`} className="text-slate-400">
              Berita
            </a>
          </div>
          {isLoading ? (
            <img
              src="/loading.gif"
              className="text-center absolute left-[40%] top-[45%] w-24 md:w-48"
              alt="loading"
            />
          ) : search.results.length !== 0 ? (
            <>
              <ImageResults image={search.results} />
            </>
          ) : (
            <YNTKTS />
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
