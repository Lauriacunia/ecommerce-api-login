
const mensajes = [];

export default (io) => {
    // Nuevo servidor para el chat
    io.on('connection', (socket) => {
        // el socket trae toda la data del cliente
        console.log('New user connected. Soquet ID : ', socket.id);

        /** on para escuchar
         *  emit para enviar
         */
        socket.on('set-user', (user) => {
            console.log('Current User Data', user);
        // socket.emit('user-connected', user);
        // socket.broadcast.emit('user-connected', user);
        });
    
    /** El servidor recibe los nuevos mensajes y los re-envia los */
        socket.on('new-message', (message) => {
            console.log('New Message', message);
            // chat.mensajes.push(message);
            // const chatNormalized =  normalizeChat(chat);
            // print(chatNormalized);
            mensajes.push(message);
            socket.emit('all-messages', mensajes);
            socket.broadcast.emit('all-messages',mensajes);
        });

    // socket.emit('messages', messages);
        socket.on('disconnect', (user) => {
            console.log('User disconnected:', user);
        });
    
    });
};