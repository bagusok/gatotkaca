import Image from 'next/image';
import Link from 'next/link';

export default function NewsResults({ data }) {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row flex-wrap">
        {data &&
          data.map((a, i) => {
            return (
              <div key={i} className="w-full md:w-1/2 md:px-2 md:py-2">
                <div className="card w-full h-full flex flex-row justify-between gap-2 bg-white shadow-md md:rounded-md py-2 px-3 border-b-2 border-slate-200">
                  <div className="card-header w-5/6 h-full py-2">
                    <h2 className="text-xs md:font-semibold text-slate-600 opacity-75 mb-1">
                      {a.source}
                    </h2>
                    <a
                      href={a.link}
                      className="text-sm md:text-md font-semibold text-black opacity-80 hover:underline"
                    >
                      {a.title}
                    </a>

                    <h2 className="text-xs font-normal italic opacity-75 mt-1">
                      {a.time}
                    </h2>
                  </div>
                  <div className="img w-2/5 md:w-1/6 h-fit bg-slate-400 rounded-md overflow-hidden self-center">
                    <Image
                      src={a.image}
                      width="100"
                      height="100"
                      objectFit="cover"
                      layout="responsive"
                      alt="images"
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
