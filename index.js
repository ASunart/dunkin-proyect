import { express, Server, cors, os } from './dependencies.js'

const expressApp = express(); //Environment setup
const PORT = 5050;
const IPaddress = os.networkInterfaces().en0[1].address;
const SERVER_IP = IPaddress;

expressApp.use(express.json()) //Middlewares
expressApp.use(cors({ origin: "*" }));
expressApp.use(express.json());
expressApp.use('/app', express.static('public-display'));
expressApp.use('/player', express.static('public-player')) //Middlewares entregamos app al cliente

// expressApp.listen(PORT);
const httpServer = expressApp.listen(PORT, () => { //Start the server
    console.log(`Server is running, host http://${SERVER_IP}:${PORT}/`);
    console.table({ 
        'Client Endpoint' : `http://${SERVER_IP}:${PORT}/app`,
        'Mupi Endpoint': `http://${SERVER_IP}:${PORT}/mupi` });
})

const io = new Server(httpServer, { path: '/real-time' }); //WebSocket Server (instance) initialization



io.on('connection', (socket) => { //Listening for webSocket connections
    console.log(socket.id)

    socket.on('positions', (message)=>{
        socket.broadcast.emit('display-positions', message);
    })
});