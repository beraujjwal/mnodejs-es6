import User from '../models/user.model';

import { addUser, removeUser, getUser, getUsersInRoom } from "./User";

export const socket = function (io) {

  // io.on("connection", (socket) => {
  //   socket.auth = false;
  //   socket.on("authenticate", async (auth) => {
  //     const { username, password } = auth;
  //     // Find user
  //     const user = await User.findOne({ username }).exec();
  //     if (user === null) {
  //       socket.emit("error", { message: "No user found" });
  //     } else if (user.password !== password) {
  //       socket.emit("error", { message: "Wrong password" });
  //     } else {
  //       socket.auth = true;
  //       socket.user = user;
  //     }
  //   });
  //   setTimeout(() => {
  //     // If the authentication failed, disconnect socket
  //     if (!socket.auth) {
  //       console.log("Unauthorized: Disconnecting socket ", socket.id);
  //       return socket.disconnect("unauthorized");
  //     }
  //       return socket.emit("authorized");
  //   }, 1000);
  //   console.log("🔥 Socket connected: ", socket.id);
  //   // socket.on("getNotifications", async (userID) => {
  //   //   const notification = await Notification.find({ userID }).lean().exec();
  //   //   if (notification === null) {
  //   //     socket.emit("notifications", []);
  //   //   } else {
  //   //     socket.emit("notifications", notification);
  //   //   }
  //   // });
  //   // socket.on("getMessages", async (userID) => {
  //   //   const message = await Message.find({ userID }).lean().exec();
  //   //   if (message === null) {
  //   //     socket.emit("messages", []);
  //   //   } else {
  //   //     socket.emit("messages", message);
  //   //   }
  //   // });
  //   socket.on("getUser", () => {
  //     socket.emit("user", {
  //       id: socket.user._id,
  //       username: socket.user.username,
  //       profileImage: socket.user.profileImage,
  //     });
  //   });
  //   socket.on("disconnect", () => {
  //     socket.disconnect("disconnect");
  //   });
  // });

  io.on("connection", (socket) => {
    console.log("🔥 Socket connected: ", socket.id);
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });


        if (error) return callback(error);

        // Emit will send message to the user
        // who had joined
        socket.emit('message', {
            user: 'admin', text:
                `${user.name},
            welcome to room ${user.room}.`
        });

        // Broadcast will send message to everyone
        // in the room except the joined user
        socket.broadcast.to(user.room)
            .emit('message', {
                user: "admin",
                text: `${user.name}, has joined`
            });

        socket.join(user.room);

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
        callback();
    })

    socket.on('sendMessage', (message, callback) => {

        const user = getUser(socket.id);
        io.to(user.room).emit('message',
            { user: user.name, text: message });

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
        callback();
    })

    socket.on('socketdisconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message',
                {
                    user: 'admin', text:
                        `${user.name} had left`
                });
        }
    })

  })

};