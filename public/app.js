document.addEventListener('DOMContentLoaded', () => {
    const socket = io(); 

    const statusDot = document.getElementById('connection-status');
    const statusText = document.getElementById('status-text');
    const tableBody = document.getElementById('signal-body');

    socket.on('connect', () => {
        statusDot.className = 'dot connected';
        statusText.textContent = 'Disambungkan';
    });

    socket.on('disconnect', () => {
        statusDot.className = 'dot disconnected';
        statusText.textContent = 'Terputus';
    });

    socket.on('tradingview_signal', (data) => {
        const row = document.createElement('tr');
        row.classList.add('new-row');

        const timeCell = document.createElement('td');
        timeCell.textContent = new Date().toLocaleTimeString('ms-MY');

        const pairCell = document.createElement('td');
        pairCell.textContent = data.pair || 'Tiada Data';

        const actionCell = document.createElement('td');
        const actionText = (data.action || 'UNDEFINED').toUpperCase();
        actionCell.textContent = actionText;
        
        if (actionText === 'BUY') {
            actionCell.classList.add('action-buy');
        } else if (actionText === 'SELL') {
            actionCell.classList.add('action-sell');
        }

        const priceCell = document.createElement('td');
        priceCell.textContent = data.price ? parseFloat(data.price).toFixed(2) : '0.00';

        row.appendChild(timeCell);
        row.appendChild(pairCell);
        row.appendChild(actionCell);
        row.appendChild(priceCell);

        tableBody.insertBefore(row, tableBody.firstChild);

        if (tableBody.children.length > 15) {
            tableBody.removeChild(tableBody.lastChild);
        }
    });
});
