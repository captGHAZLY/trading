const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Tetapan WebSockets untuk membenarkan laman web berhubung
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(express.json());
app.use(cors());

// 1. Ini adalah link/URL yang anda akan letak di TradingView Alert Webhook
app.post('/webhook', (req, res) => {
    const signalData = req.body;
    
    console.log('Signal Diterima dari TradingView:', signalData);

    // 2. Hantar data terus ke laman web (Vanilla JS) anda
    io.emit('tradingview_signal', signalData);

    res.status(200).send('Berjaya');
});

// Buka pelayan
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Pelayan beroperasi di port ${PORT}`);
});
