'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/RoomPage');
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-800 p-6">
        <div className="text-center max-w-2xl w-full text-gray-300 animate-fade-in">
          <header>
            <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
              FlashFiles
            </h1>
            <p className="text-xl text-gray-200 mb-6 leading-relaxed">
              <span className="text-yellow-500 font-semibold">
                Experience real-time file sharing like never before.
              </span>
              <br />
              Fast, secure, and effortless—designed to keep you connected.
            </p>
            <button
              onClick={handleGetStarted}
              className="mt-8 px-10 py-4 bg-yellow-500 text-white font-semibold text-xl rounded-full shadow-lg hover:bg-yellow-400 transition-transform transform duration-300 ease-in-out hover:scale-110 hover:shadow-yellow-700/50"
            >
              Start Sharing Now
            </button>
          </header>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }
      `}</style>
    </>
  );
}
