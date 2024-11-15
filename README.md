# FlashFiles

**FlashFiles** is a real-time chat and file-sharing application that enables users to create rooms, share files, and communicate via voice calls—all without needing to sign in or sign up. It's designed for seamless, quick collaboration and file exchanges.

## Features

- **No Sign-in Required**: Users can create rooms and join via a unique link.
- **Real-time Chat**: Engage in instant messaging with real-time updates powered by Socket.io.
- **File Sharing**: Upload and download files up to 100 MB securely.
- **Voice Calling**: Initiate voice calls directly within the application.
- **User-Friendly Interface**: Intuitive design for easy navigation and usage.
- **Volatile Storage**: All chat history, files, and user data are deleted after users leave the room or the host ends it, ensuring privacy and security.

## Tech Stack

- **Frontend**:
  - Next.js with TypeScript
  - Tailwind CSS
- **Backend**:
  - Node.js with Express
  - Socket.IO and WebRTC for messaging and voice chat.
  - Cloud Storage - Firebase

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/AbhishekNaik1112/FlashFiles.git
   cd FlashFiles
   ```

2. **Set up the server**:

   - Navigate to the `server` directory.
   - Create a new `.env` file and enter your `PORT`.
   - Install dependencies:
     ```bash
     npm i
     ```
   - Start the server:
     ```bash
     npm run server
     ```

3. **Set up the database**:

   - Navigate to the `database` directory.
   - Create a new `.env` file and enter your `FIREBASE_CREDENTIALS`.
   - Install dependencies:
     ```bash
     npm i
     ```
   - Start the server:
     ```bash
     npm run database
     ```

4. **Set up the socket**:

   - Navigate to the `socket` directory.
   - Create a new `.env` file and enter your `PORT`.
   - Install dependencies:
     ```bash
     npm i
     ```
   - Start the server:
     ```bash
     npm run socket
     ```

5. **Set up the frontend**:

   - Navigate to the `frontend` directory.
   - Install dependencies:
     ```bash
     npm i
     ```
   - Start the Next.js app:
     ```bash
     npm run client
     ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Create a new room to generate a unique link.
- Share the link with others to invite them into the room.
- Use the chat interface for messaging and the file upload feature for sharing files.
- Initiate voice calls directly from the chat interface.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the application.

## Contact

For questions or suggestions, feel free to reach out at [abhisheknaik1112@gmail.com].
