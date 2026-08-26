import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';

function setupSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (error) {
      next(new Error('Invalid or expired token'));
    }
  });

  io.on('connection', (socket) => {
    const { id, role } = socket.user;

    socket.join(`user:${id}`);
    if (role === 'admin') {
      socket.join('admins');
    }

    socket.on('disconnect', () => {
      // Rooms are cleaned up automatically by socket.io on disconnect.
    });
  });

  return io;
}

export default setupSocket;
