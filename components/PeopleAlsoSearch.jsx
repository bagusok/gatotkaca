import Image from 'next/image';
import Link from 'next/link';

export default function PeopleAlsoSearch({ data }) {
  return (
    <>
      {data[0] && (
        <>
          {' '}
          <h2 className="-mb-1 mt-2 text-sm text-black font-semibold">
            Orang Juga Mencari
          </h2>
          <div className="flex flex-row md:pb-4 overflow-x-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full gap-2 scroll-smooth cursor-pointer scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 scrollbar-hide md:scrollbar-default">
            {data &&
              data.map((a, i) => {
                return (
                  <Link key={i} href={`/search?q=${a.title}&page=1`} passHref>
                    <div className="flex flex-row items-center gap-2 rounded-md p-2 border border-slate-300 hover:opacity-70">
                      <div className="w-12 h-12 bg-slate-100 rounded-md">
                        <Image
                          alt="people"
                          src={a.thumbnail}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          layout="responsive"
                        />
                      </div>
                      <div className="min-w-max text-start">
                        <h2 className="text-md font-normal">{a.title}</h2>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </>
      )}
    </>
  );
}
