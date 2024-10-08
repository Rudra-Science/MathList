function generateMagicSquare() {
    const targetSum = parseInt(document.getElementById('targetSum').value);

    if (!targetSum || targetSum < 15) {
        alert('Please enter a valid sum (>= 15)');
        return;
    }

    const magicSquare = createMagicSquare(targetSum);
    displayMagicSquare(magicSquare);
}

// Function to generate the magic square based on target sum
function createMagicSquare(targetSum) {
    const n = 3; // Size of the magic square
    const magicSquare = Array.from({ length: n }, () => Array(n).fill(0));
    
    let num = 1;
    let i = 0;
    let j = Math.floor(n / 2); // Start from the middle of the top row

    while (num <= n * n) {
        magicSquare[i][j] = num;
        num++;
        let newi = (i - 1 + n) % n;
        let newj = (j + 1) % n;

        if (magicSquare[newi][newj]) { // If the cell is already filled
            i = (i + 1) % n; // Move down
        } else {
            i = newi;
            j = newj;
        }
    }

    // Adjust the magic square to match the target sum
    const magicConstant = n * (n * n + 1) / 2;
    const scaleFactor = targetSum / magicConstant;

    return magicSquare.map(row => 
        row.map(num => Math.round(num * scaleFactor))
    );
}

// Function to display the magic square on the UI
function displayMagicSquare(magicSquare) {
    const container = document.getElementById('magicSquare');
    container.innerHTML = ''; // Clear previous square

    for (let i = 0; i < magicSquare.length; i++) {
        const row = document.createElement('div');
        row.classList.add('square-row'); // Add class for styling

        for (let j = 0; j < magicSquare[i].length; j++) {
            const cell = document.createElement('div');
            cell.classList.add('square-cell');
            cell.textContent = magicSquare[i][j];
            row.appendChild(cell);
        }
        container.appendChild(row); // Append row directly to the container
    }
}
