'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import '../styles/globals.css';

export default function RoomPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    } else {
      const name = prompt("Please enter your name:");
      if (name?.trim()) {
        setUserName(name);
        localStorage.setItem('userName', name);
      } else {
        setUserName('Guest');
      }
    }
  }, []);

  const handleCreateRoom = () => {
    router.push('/CreateRoom');
  };

  const handleJoinRoom = () => {
    router.push('/JoinRoom');
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-black p-6 animate-gradient">
        <div className="text-center max-w-md w-full text-gray-300 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Hey, {userName || "Guest"}!
          </h2>
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-md">
            Welcome to FlashFiles Rooms
          </h1>
          <p className="text-gray-400 mb-8 text-lg">
            Create a room to share files or join an existing one for seamless collaboration.
          </p>
          <div className="space-y-6">
            <button
              onClick={handleCreateRoom}
              className="w-full px-6 py-4 bg-green-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-green-500 transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-green-700/50"
            >
              Create a Room
            </button>
            <button
              onClick={handleJoinRoom}
              className="w-full px-6 py-4 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-blue-500 transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-blue-700/50"
            >
              Join a Room
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}
