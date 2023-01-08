import Link from 'next/link';

export default function Karya({ karya }) {
  return (
    <>
      {karya.length > 0 && (
        <>
          <h2 className="-mb-1 mt-4 text-sm text-black font-semibold capitalize">
            Karya
          </h2>
          <div className="flex flex-row mt-2 md:pb-4 overflow-x-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full gap-2 scroll-smooth cursor-pointer scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 scrollbar-hide md:scrollbar-default">
            {karya?.map((a, i) => {
              return (
                <div key={i}>
                  <Link href={`/search?q=${a.title}&page=1`} passHref>
                    <div className="flex flex-row items-center gap-2 rounded-md p-2 border border-slate-300 hover:opacity-70">
                      <div className="min-w-max text-start">
                        <h2 className="text-md font-normal capitalize">
                          {a.title} : {a.year || a.album || a.episode}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
