import { FiUser } from 'react-icons/fi';
import Image from 'next/image';
import { useState } from 'react';

export default function User() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    window.location.href = 'https://bagusok.github.io/';
  };

  return (
    <>
      <div className="user self-end place-self-end place-items-end text-end w-1/3 absolute top-3 right-4 md:sticky md:px-3 pt-1 hover:opacity-75">
        <Image
          src="/Avatar.png"
          width={40}
          height="40"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <div className="absolute right-8 top-[4.5rem] flex flex-col w-48 bg-white shadow-md rounded-md border border-slate-200 p-2">
          <div className="form-group flex flex-row gap-3 rounded-md hover:bg-yellow-400 p-2 items-center">
            <Image
              src="/Avatar.png"
              width={40}
              height="40"
              onClick={() => setIsOpen(!isOpen)}
            />
            <h2 className="text-sm">Hi, Bro</h2>
          </div>
          <div
            className="form-group flex flex-row gap-3 rounded-md hover:bg-yellow-400 p-2 items-center"
            onClick={() => handleClick()}
          >
            <FiUser />
            <h2 className="text-sm">
              <a href="https://bagusok.github.io/">Author</a>
            </h2>
          </div>
        </div>
      )}
    </>
  );
}
