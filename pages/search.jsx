/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';
import SearchResult from '../components/SearchResult';
import Pagination from '../components/Pagination';
import YNTKTS from '../components/YNTKTS';
import Footer from '../components/Footer';
import User from '../components/User';
import HeadMeta from '../components/Head';
import { event } from '../lib/ga';
import randomString from '../lib/randomString';
import Panelnya from '../components/Panelnya';
import PeopleAlsoSearch from '../components/PeopleAlsoSearch';
import RelatedSearch from '../components/RelatedSearch';

export function getServerSideProps(ctx) {
  const page = ctx.query.page || 1;
  const { q } = ctx.query;
  return { props: { q, page } };
}

export default function Search(props) {
  const router = useRouter();

  const { q, page } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState(props.q || q);

  const getSearch = async (q, pages) => {
    let get = await fetch(`/api/search2?q=${q}&page=${pages || 0}`, {
      method: 'GET',
      headers: {
        'X-CSRF-TOKEN': randomString(32).toString(),
      },
    });
    if (get.ok) {
      let res = await get.json();
      return res;
    } else {
      return { status: 'failed' };
    }
  };

  useEffect(() => {
    if (!q) {
      router.push('/');
    }
    setIsLoading(true);
    getSearch(q, page).then((res) => {
      if (res.status === 'success') {
        setSearch(res);
        setInput(props.q);
        setIsLoading(false);
      } else {
        setSearch({ results: '' });
        setIsLoading(false);
      }
    });
  }, [router]);

  const handleSearch = (e) => {
    e.preventDefault();
    event({
      action: 'search2',
      params: {
        search_term: input,
      },
    });
    router.push({ query: { q: input, page: 1 } });
  };

  return (
    <>
      <HeadMeta title={q + ' | Gatotkaca Search'} />
      <div className="min-h-screen flex flex-col justify-between px-3 py-6 md:px-[2rem]">
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
            <a href="#" className="border-b-2 border-slate-500">
              Semua
            </a>
            <a href={`/images?q=${q}&page=1`} className="text-slate-400">
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
              {search.mungkin && (
                <p className="text-sm font-normal mt-2 italic">
                  Mungkin anda mencari{' '}
                  <Link href={`search?q=${search.mungkin}&page=1`}>
                    <span className="text-blue-700 font-semibold hover:underline cursor-pointer">
                      {search.mungkin}
                    </span>
                  </Link>
                </p>
              )}
              <div className="flex flex-col-reverse md:flex-row gap-6 mt-0 md:mt-8">
                <div className="w-full md:w-2/3">
                  <SearchResult
                    search={search.results}
                    videos={props.page == 1 ? search.videos : ''}
                  />
                  <div className="mt-5 md:mt-[5rem]">
                    <Pagination />
                  </div>
                </div>

                <div className="flex flex-col w-full gap-4 md:w-1/3">
                  {search.panel.title && search.panel.title !== 'N/A' && (
                    <>
                      <Panelnya panel={search.panel} />
                      <PeopleAlsoSearch data={search.people_also_search} />
                      <div className="hidden md:block">
                        <RelatedSearch data={search.related_search} />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="block md:hidden">
                <RelatedSearch data={search.related_search} />
              </div>
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
