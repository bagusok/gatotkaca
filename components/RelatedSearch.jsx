import Link from 'next/link';

export default function RelatedSearch({ data }) {
  return (
    <>
      {data.length > 0 && (
        <>
          <h2 className="text-sm font-semibold mb-1 mt-2">Related Search</h2>
          <div className="grid grid-rows-4 scrollbar-hide grid-flow-col auto-cols-max gap-2 overflow-x-scroll md:flex md:flex-row md:flex-wrap md:overflow-hidden pb-3">
            {data &&
              data.map((a, i) => {
                return (
                  <Link key={i} href={`/search?q=${a}&page=1`} passHref>
                    <div className="p-2 rounded-md border border-slate-300 hover:opacity-70 cursor-pointer w-full md:w-auto">
                      <h2 className="text-sm text-blue-600">{a}</h2>
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
