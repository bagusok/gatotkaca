import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useState } from 'react';
import HeadMeta from '../components/Head';
import User from '../components/User';
import Footer from '../components/Footer';
import { event } from '../lib/ga';

export default function Home() {
  const router = useRouter();

  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    event({
      action: 'search',
      params: {
        search_term: input,
      },
    });

    router.push('/search?q=' + input + '&page=1');
  };

  return (
    <>
      <HeadMeta />
      <div className="flex flex-col min-h-screen px-5 relative">
        <nav className="flex justify-end px-3 py-2 h-16 md:min-h-8">
          <div className="flex h-full flex-row gap-3 items-center">
            <a href="#" className="text-sm font-normal hover:opacity-75">
              GKMail
            </a>
            <a
              href="#"
              className="text-sm font-normal hover:opacity-75 mr-12 mdmr-0"
            >
              Gambar
            </a>

            <User />
          </div>
        </nav>
        <div className="flex flex-col w-full items-center text-center gap-4 mt-[6rem]">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-wide text-orange-400">
            Gatot Kaca
          </h1>
          <div className="md:w-3/6 mt-8">
            <form onSubmit={(e) => handleSearch(e)}>
              <div className="form-group relative">
                <input
                  type="text"
                  className="h-12 w-full rounded-full px-[4rem] py-2 border border-slate-200 shadow-md focus:border-2 focus:border-slate-400 focus:outline-none"
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  placeholder="Cari apa..."
                />
                <div className="icon z-50 w-fit text-2xl font-bold absolute left-5 top-auto bottom-3 text-slate-400">
                  <FiSearch />
                </div>
              </div>
              <button className="text-xs font-semibold px-12 py-2 bg-slate-100 border border-slate-300 rounded-md text-gray-600 mt-7 hover:bg-gray-300">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="absolute bottom-5 md:bottom-3 left-5">
          <Footer />
        </div>
      </div>
    </>
  );
}
