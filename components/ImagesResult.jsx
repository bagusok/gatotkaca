import Image from 'next/image';

export default function ImageResults({ image }) {
  return (
    <>
      <div className="flex flex-row flex-wrap mt-7">
        {image &&
          image.map((a, i) => {
            return (
              <div
                key={i}
                className="card w-1/2 h-56 p-2 md:w-1/5 md:h-56 flex flex-col bg-white"
              >
                <div className="card-image h-5/6 overflow-hidden rounded-md bg-slate-100">
                  <Image
                    src={a.preview.url}
                    width={a.preview.height}
                    height={a.preview.width}
                    layout="responsive"
                    objectFit="cover"
                    alt="images"
                  />
                </div>
                <div className="card-body p-2">
                  <a
                    href={a.origin.website.url}
                    className="text-sm font-normal"
                  >
                    <p className="hover:border-b-2 hover:border-gray-500 truncate">
                      {a.origin.title}
                    </p>
                  </a>
                  <p className="text-xs text-slate-500 truncate">
                    {a.origin.website.domain}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
