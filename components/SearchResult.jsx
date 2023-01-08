import Link from 'next/link';
import VideoResult from './VideoResult';

export default function SearchResult({ search, videos }) {
  return (
    <div className="flex flex-col gap-7 text-start">
      {/* {videos && <VideoResult videos={videos} />} */}
      {search &&
        search.map((a, i) => {
          return (
            <div key={i} className="card">
              <p className="text-xs font-normal text-black mb-1 truncate">
                {a.url}
              </p>
              <Link href={a.url} passHref>
                <a className="text-xl font-normal text-blue-700 hover:underline">
                  {a.title}
                </a>
              </Link>
              <p className="text-xs font-normal text-slate-500 mt-1">
                {a.description}
              </p>
            </div>
          );
        })}
    </div>
  );
}
