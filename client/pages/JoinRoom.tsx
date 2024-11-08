'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/globals.css';

export default function JoinRoom() {
  const [roomId, setRoomId] = useState<string>(''); 
  const router = useRouter();

  const handleJoinRoom = () => {
    if (roomId.trim() === '') {
      alert('Please enter a valid Room ID or Link');
      return;
    }

    let finalRoomId = roomId;

    if (roomId.includes('?roomId=')) {
      try {
        const url = new URL(roomId);
        finalRoomId = url.searchParams.get('roomId') || ''; 
      } catch (error) {
        alert(error);
        return;
      }
    }

    if (finalRoomId) {
      router.push(`/RoomPage?roomId=${finalRoomId}`);
    } else {
      alert('Invalid room link or ID');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="text-center max-w-md w-full text-gray-300">
        <h1 className="text-3xl font-bold text-white mb-6">
          Join a Room
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Enter a Room ID or Room Link to join.
        </p>
        
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID or Link"
          className="w-full p-3 mb-6 text-gray-300 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleJoinRoom}
          className="w-full px-6 py-4 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-blue-500 transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-blue-700/50"
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
