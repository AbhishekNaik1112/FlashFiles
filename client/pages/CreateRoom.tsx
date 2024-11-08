'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/globals.css';

export default function CreateRoom() {
  const [roomLink, setRoomLink] = useState<string>(''); 
  const router = useRouter();

  const handleCreateRoom = () => {
    const roomId = Math.random().toString(36).substr(2, 9); 
    const link = `${window.location.origin}/JoinRoom?roomId=${roomId}`;
    setRoomLink(link);
  };

  const handleCopyLink = () => {
    if (roomLink) {
      navigator.clipboard.writeText(roomLink);
      alert('Room link copied to clipboard!');
    }
  };

  const handleGoToRoom = () => {
    if (roomLink) {
      router.push(roomLink);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-black p-6">
      <div className="text-center max-w-md w-full text-gray-300">
        <h1 className="text-3xl font-bold text-white mb-6">
          Create a Room
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Click &quot;Generate Link&quot; to create a room and share the link for others to join.
        </p>
        
        <button
          onClick={handleCreateRoom}
          className="w-full px-6 py-4 bg-green-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-green-500 transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-green-700/50 mb-6"
        >
          Generate Link
        </button>

        {roomLink && (
          <div className="bg-gray-700 rounded-lg p-4 shadow-lg">
            <p className="text-sm text-gray-400 mb-2">Room Link:</p>
            <input
              type="text"
              readOnly
              value={roomLink}
              className="w-full p-2 text-gray-300 bg-gray-800 rounded-md focus:outline-none mb-4"
            />
            <div className="flex space-x-4 justify-center">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-500 transition duration-300"
              >
                Copy Link
              </button>
              <button
                onClick={handleGoToRoom}
                className="px-4 py-2 bg-yellow-600 text-white font-semibold rounded-full shadow-md hover:bg-yellow-500 transition duration-300"
              >
                Go to Room
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
