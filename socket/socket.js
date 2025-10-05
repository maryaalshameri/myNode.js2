// socket/socket.js
let io;

export const initSocket = (server) => {
  import("socket.io").then(({ Server }) => {
    io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });

    io.on("connection", (socket) => {
      console.log(`🟢 New client connected: ${socket.id}`);

      socket.on("chatMessage", (data) => {
        console.log("💬 Message received:", data);
        io.emit("chatMessage", {
          user: data.user,
          message: data.message,
          time: new Date().toLocaleTimeString(),
        });
      });

      socket.on("disconnect", () => {
        console.log(`🔴 Client disconnected: ${socket.id}`);
      });
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};
