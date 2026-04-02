const io = require('socket.io')(3000, {
    cors:{origin:'*'}
});
const usrs = {};
io.on('connection',socket =>{
    socket.on('new-user-joined',name =>{
        console.log("New user",name);
        usrs[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message,name: usrs[socket.id]})
    });

    socket.on('disconnect',message =>{
    socket.broadcast.emit('left',usrs[socket.id]);
    delete usrs[socket.id];
}); 
});