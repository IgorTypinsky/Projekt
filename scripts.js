document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        let header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'linear-gradient(90deg, #3b8d2f, #7acb63)';
        } else {
            header.style.background = 'linear-gradient(90deg, #56ab2f, #a8e063)';
        }
    });

    if (document.getElementById('ticket-form')) {
        document.getElementById('ticket-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const travelClass = document.getElementById('class').value;

            const ticketInfo = {
                from,
                to,
                date,
                time,
                travelClass
            };

            displayResults(ticketInfo);

            generateQRCode(ticketInfo);
        });
    }

    function displayResults(ticketInfo) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <h2>Wybrane Połączenie</h2>
            <p>Skąd: ${ticketInfo.from}</p>
            <p>Dokąd: ${ticketInfo.to}</p>
            <p>Data: ${ticketInfo.date}</p>
            <p>Godzina: ${ticketInfo.time}</p>
            <p>Klasa: ${ticketInfo.travelClass === '1' ? 'Pierwsza Klasa' : 'Druga Klasa'}</p>
        `;
    }

    function generateQRCode(ticketInfo) {
        const qrCodeDiv = document.getElementById('qr-code');
        const ticketString = JSON.stringify(ticketInfo);
        QRCode.toCanvas(ticketString, { errorCorrectionLevel: 'H' }, function (error, canvas) {
            if (error) console.error(error);
            qrCodeDiv.innerHTML = '';
            qrCodeDiv.appendChild(canvas);
        });
    }
});
