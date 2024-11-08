import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import SimplePeer, { Instance as SimplePeerInstance } from 'simple-peer';
import "../styles/globals.css";

const socket: Socket = io('http://localhost:5000'); 

export default function DummyRoom() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<SimplePeerInstance | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', message);
      setMessages((prev) => [...prev, `Me: ${message}`]);
      setMessage('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const sendFile = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        socket.emit('sendFile', { file: reader.result, fileName: file.name });
      };
      reader.readAsDataURL(file);
      setFile(null);
    }
  };

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    setStream(stream);
    const newPeer = new SimplePeer({ initiator: true, trickle: false, stream });
    
    newPeer.on('signal', (data) => {
      socket.emit('callUser', data);
    });
    
    socket.on('callAccepted', (signal) => {
      newPeer.signal(signal);
    });

    setPeer(newPeer);
  };

  useEffect(() => {
    socket.on('callUser', (data) => {
      const newPeer = new SimplePeer({ initiator: false, trickle: false });
      newPeer.signal(data);

      newPeer.on('signal', (signal) => {
        socket.emit('callAccepted', signal);
      });

      newPeer.on('stream', (currentStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
          videoRef.current.play();
        }
      });

      setPeer(newPeer);
    });

    return () => {
      socket.off('callUser');
      socket.off('callAccepted');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-gray-300 flex flex-col items-center p-6">
      <div className="max-w-4xl w-full bg-gray-900 p-6 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-white">Chat Room</h1>

        <div className="space-y-4 bg-gray-700 p-4 rounded-lg max-h-60 overflow-auto">
          {messages.map((msg, index) => (
            <p key={index} className="text-sm text-gray-400">{msg}</p>
          ))}
        </div>

        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-3 rounded-md bg-gray-800 border border-gray-600 text-gray-300 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 transition duration-300"
          >
            Send Message
          </button>
        </div>

        <div className="flex space-x-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="flex-1 p-3 rounded-md bg-gray-800 border border-gray-600 text-gray-300 focus:outline-none"
          />
          <button
            onClick={sendFile}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
          >
            Send File
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={startCall}
            className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition duration-300"
          >
            Start Voice Call
          </button>
        </div>

        {stream && (
          <div className="flex justify-center items-center space-x-4">
            <audio autoPlay controls srcObject={stream} className="border-2 border-gray-600 rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
