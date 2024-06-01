document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        let header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'linear-gradient(90deg, #3b8d2f, #7acb63)';
        } else {
            header.style.background = 'linear-gradient(90deg, #56ab2f, #a8e063)';
        }
    });

    document.getElementById('calculate-price').addEventListener('click', function() {
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const travelClass = document.getElementById('class').value;
        const ticketQuantity = document.getElementById('ticket-quantity').value;
        const discount = document.getElementById('discount').value;

        if (from === "" || to === "" || travelClass === "" || ticketQuantity === "" || discount === "") {
            alert("Proszę wypełnić wszystkie pola formularza przed obliczeniem ceny.");
            return;
        }

        let basePrice = travelClass === '1' ? 100 : 50;
        let discountFactor = 1;

        if (discount === 'student') discountFactor = 0.51;
        if (discount === 'senior') discountFactor = 0.78;
        if (discount === 'dziecko') discountFactor = 0.37;

        const totalPrice = basePrice * ticketQuantity * discountFactor;

        const priceDiv = document.getElementById('price');
        priceDiv.innerHTML = `<p>Cena: ${totalPrice} PLN</p>`;

        document.getElementById('buy-ticket').style.display = 'block';
    });


    if (document.getElementById('ticket-form')) {
        document.getElementById('ticket-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const travelClass = document.getElementById('class').value;
            const ticketQuantity = document.getElementById('ticket-quantity').value;
            const discount = document.getElementById('discount').value;

            const ticketInfo = {
                from,
                to,
                date,
                time,
                travelClass,
                ticketQuantity,
                discount
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
            <p>Liczba biletów: ${ticketInfo.ticketQuantity}</p>
            <p>Ulga: ${ticketInfo.discount}</p>
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
