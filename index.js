import { express, Server, cors, os } from './dependencies.js'

const expressApp = express(); //Environment setup
const PORT = 5050;
// const IPaddress = os.networkInterfaces().en0[1].address;
// const SERVER_IP = IPaddress;

expressApp.use(express.json()) //Middlewares
expressApp.use(express.urlencoded({extended: true}));
expressApp.use(cors({ origin: "*" }));
expressApp.use('/app', express.static('public-display'));
expressApp.use('/player', express.static('public-player')) //Middlewares entregamos app al cliente

// expressApp.listen(PORT);
const httpServer = expressApp.listen(PORT, () => { //Start the server
    console.table({ 
        'MUPI Endpoint' : `http:/localhost:${PORT}/app`,
        'Client Endpoint': `http://localhost:${PORT}/player` });
})

const users = [];

const io = new Server(httpServer, { path: '/real-time' }); //WebSocket Server (instance) initialization

expressApp.post('/player/:id', (req, res)=>{
    const user = req.body;
    res.send(`
    <link rel="stylesheet" href="./thanks.css">
    <h2>Thanks ${user.name} for submitting your info</h2>
    `)
    users.push(user)
    console.log(users)
})

io.on('connection', (socket) => { //Listening for webSocket connections
    console.log(socket.id)

    socket.on('mobile-positions', (message)=>{
        socket.broadcast.emit('mupi-positions', message);
    })

    socket.on('screens', screens =>{
        socket.broadcast.emit('mupi-screens', screens);
    })

    socket.on('device-size', deviceSize => {
        socket.broadcast.emit('mupi-size', deviceSize);
    });
});