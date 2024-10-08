function calculate() {
    // Get input values and split them into an array of numbers
    const input = document.getElementById("numberInput").value;
    const numbers = input.split(',').map(Number).filter(n => !isNaN(n)); // Filter valid numbers
  
    if (numbers.length === 0) {
      alert('Please enter valid numbers separated by commas.');
      return;
    }
  
    // Mean calculation
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  
    // Median calculation
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedNumbers.length / 2);
    const median = sortedNumbers.length % 2 === 0
      ? (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2
      : sortedNumbers[middleIndex];
  
    // Mode calculation
    const frequencyMap = {};
    numbers.forEach(num => {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    });
    const mode = Object.keys(frequencyMap).reduce((a, b) =>
      frequencyMap[a] > frequencyMap[b] ? a : b
    );
  
    // Output the results
    document.getElementById("meanOutput").textContent = `Mean: ${mean}`;
    document.getElementById("medianOutput").textContent = `Median: ${median}`;
    document.getElementById("modeOutput").textContent = `Mode: ${mode}`;
  }
  