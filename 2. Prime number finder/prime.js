document.getElementById('findPrimes').addEventListener('click', function () {
    const start = parseInt(document.getElementById('start').value);
    const end = parseInt(document.getElementById('end').value);
    const resultDiv = document.getElementById('result');
    const statusMessage = document.createElement('div');
    statusMessage.className = 'status-message';
    statusMessage.textContent = 'Finding the prime numbers...';
    resultDiv.innerHTML = ''; // Clear previous results
    resultDiv.appendChild(statusMessage); // Add status message

    // Validate input
    if (isNaN(start) || isNaN(end) || start < 0 || end < 0 || start > end) {
        resultDiv.innerHTML = '<p>Please enter valid range!</p>';
        return;
    }

    // Add a delay before finding primes
    setTimeout(() => {
        const primes = findPrimesInRange(start, end);
        displayPrimes(primes, resultDiv);
    }, 2000); // 2-second delay
});   

function findPrimesInRange(start, end) {
    const primes = [];
    for (let num = start; num <= end; num++) {
        if (isPrime(num)) {
            primes.push(num);
        }
    }
    return primes;
}

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function displayPrimes(primes, container) {
    const statusMessage = container.querySelector('.status-message');
    container.removeChild(statusMessage); // Remove status message

    if (primes.length === 0) {
        container.innerHTML = '<p>No primes found in this range.</p>';
        return;
    }

    primes.forEach(prime => {
        const primeDiv = document.createElement('div');
        primeDiv.className = 'prime';
        primeDiv.textContent = prime;
        container.appendChild(primeDiv);
    });
}
