
let express = require('express')
let app = express();
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);
let mongoose = require('mongoose');
let messages = require('./routes/messages');
let bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

mongoose.connect('mongodb://database/chat_db', {useMongoClient: true})
    .then(() => { console.log('Successful mongo connection.'); })
    .catch(err => console.log(err));

io.on('connection', (socket) => {
    socket.on('connected', () => {
        io.emit('connected');
    })
    socket.on('disconnected', (name) => {
        io.emit('disconnected')
    })
    socket.on('new-message', (message) => {
        io.emit('new-message', message);
    });
});

app.get('/getTotalUsers', function (req, res) {
    let totalUsers = Object.keys(io.sockets.connected).length;
    return res.status(200).send({ total: totalUsers });
});

app.get('/', (req, res) => {
    res.send('api works');
});

server.listen(port, () => {
    console.log(`Started on port: ${port}.`);
});

app.use('/api', messages);
module.exports = app; 