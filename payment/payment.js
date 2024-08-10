document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Gather payment details
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Call the payment gateway API
    fetch('https://api.example.com/charge', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
            amount: 1000 // Example amount in cents
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Payment successful!');
        } else {
            alert('Payment failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});


