const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

// --- KOD BAHARU DI SINI ---
// Beritahu pelayan untuk memaparkan fail HTML, CSS, dan JS dari folder bernama 'public'
app.use(express.static('public'));

// Terima webhook dari MT4 / TradingView
app.post('/webhook', (req, res) => {
    const signalData = req.body;
    console.log('Signal Diterima:', signalData);

    // Hantar data ke laman web (Vanilla JS)
    io.emit('tradingview_signal', signalData);

    res.status(200).send('Berjaya');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Pelayan beroperasi di port ${PORT}`);
});
