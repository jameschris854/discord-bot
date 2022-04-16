const bot = require('./server')
const express = require('express');
const app = express();
const port = 3001;
const EventEmitter = require('events');
const { messageHandler } = require("./controllers/messageController");
const { interactionHandler } = require('./controllers/interactionController');
const myEE = new EventEmitter();
myEE.setMaxListeners(0);

bot.on('interactionCreate', interactionHandler)

bot.on("messageCreate", messageHandler)

myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());

app.get('/', (req, res) => res.send( '<!-- Global site tag (gtag.js) - Google Analytics --><script async src="https://www.googletagmanager.com/gtag/js?id=G-7L1D36S69D"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "G-7L1D36S69D");</script>Hello World!'));

app.listen(port, () => console.log(`Discord app listening at http://localhost:${port}`));