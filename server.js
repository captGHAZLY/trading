const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Membenarkan pelayan membaca data dari TradingView / MT4
app.use(express.json());

// INI YANG PALING PENTING: 
// Mengarahkan pelayan untuk mencari fail rekaan (CSS) dan enjin (JS) di dalam folder 'public'
app.use(express.static('public'));

// Terima webhook dari MT4 / TradingView
app.post('/webhook', (req, res) => {
    const signalData = req.body;
    console.log('Signal Diterima:', signalData);

    // Hantar data ke laman web anda
    io.emit('tradingview_signal', signalData);

    res.status(200).send('Berjaya');
});

// Hidupkan pelayan
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Pelayan beroperasi di port ${PORT}`);
});
