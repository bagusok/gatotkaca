import Image from 'next/image';

export default function VideoResult({ videos }) {
  return (
    <>
      {videos && (
        <div className="w-full">
          <h2 className="text-sm font-semibold mb-2">Related Videos</h2>
          <div className="flex flex-row md:pb-4 gap-2  w-full md:h-56 rounded-md overflow-x-scroll pb-2 overflow-y-hidden scrollbar-hide md:scrollbar-default scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-300 scrollbar-track-slate-100">
            {videos.map((a, i) => {
              return (
                <div key={i} className="w-1/3">
                  <div className="card flex flex-col justify-between h-full w-full  rounded-md bg-white shadow-md p-2 border border-slate-200 ">
                    <div className="image overflow-hidden h-auto bg-black">
                      <Image
                        src={a.thumbnails.url}
                        width="100%"
                        height="50%"
                        alt={a.title}
                        layout="responsive"
                        objectFit="cover"
                      />
                    </div>
                    <div className="card-body h-1/3">
                      <h2
                        href={a.url}
                        className="font-semibold text-sm hover:text-gray-400 truncate"
                      >
                        <a href={a.url}> {a.title}</a>
                      </h2>
                      <p className="font-normal text-xs text-slate-500 truncate">
                        {a.channel.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
