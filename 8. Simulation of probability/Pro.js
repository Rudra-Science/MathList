const totalOutcomesInput = document.getElementById('totalOutcomes');
const differentOutcomesInput = document.getElementById('differentOutcomes');
const generateButton = document.getElementById('generateButton');
const outcomeInputsDiv = document.getElementById('outcomeInputs');
const calculateButton = document.getElementById('calculateButton');
const refreshButton = document.getElementById('refreshButton');
const resultDisplay = document.getElementById('result');

generateButton.addEventListener('click', () => {
    outcomeInputsDiv.innerHTML = '';
    const differentOutcomes = parseInt(differentOutcomesInput.value);

    if (isNaN(differentOutcomes) || differentOutcomes < 1) {
        return;
    }

    for (let i = 0; i < differentOutcomes; i++) {
        const label = document.createElement('label');
        label.textContent = `Favourable Outcomes for Type ${i + 1}:`;

        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.id = `outcomeType${i + 1}`;
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission
                const nextInput = document.getElementById(`outcomeType${i + 2}`);
                if (nextInput) {
                    nextInput.focus(); // Move focus to the next input
                } else {
                    calculateButton.focus(); // Focus on calculate button if last input
                }
            }
        });

        const container = document.createElement('div');
        container.className = 'input-group';
        container.appendChild(label);
        container.appendChild(input);
        outcomeInputsDiv.appendChild(container);
    }

    generateButton.style.display = 'none';
    calculateButton.style.display = 'inline-block';
});

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

calculateButton.addEventListener('click', () => {
    const totalOutcomes = parseInt(totalOutcomesInput.value);
    const probabilities = [];

    const differentOutcomes = parseInt(differentOutcomesInput.value);
    for (let i = 0; i < differentOutcomes; i++) {
        const outcomeValue = parseInt(document.getElementById(`outcomeType${i + 1}`).value) || 0;
        const numerator = outcomeValue;
        const denominator = totalOutcomes;

        const divisor = gcd(numerator, denominator);
        const simplifiedNumerator = numerator / divisor;
        const simplifiedDenominator = denominator / divisor;

        const probability = `${numerator}/${denominator} = ${simplifiedNumerator}/${simplifiedDenominator}`;
        probabilities.push(`P(Type ${i + 1}) = ${probability}`);
    }

    resultDisplay.innerHTML = probabilities.join('<br>');
    resultDisplay.style.display = 'block';
    outcomeInputsDiv.innerHTML = ''; // Clear outcome inputs
    calculateButton.style.display = 'none';
    refreshButton.style.display = 'inline-block'; // Show refresh button
});

refreshButton.addEventListener('click', () => {
    totalOutcomesInput.value = '';
    differentOutcomesInput.value = '';
    outcomeInputsDiv.innerHTML = '';
    resultDisplay.style.display = 'none';
    generateButton.style.display = 'inline-block';
    calculateButton.style.display = 'none';
    refreshButton.style.display = 'none';
});


calculateButton.addEventListener('click', () => {
    const totalOutcomes = parseInt(totalOutcomesInput.value);
    const probabilities = [];

    const differentOutcomes = parseInt(differentOutcomesInput.value);
    for (let i = 0; i < differentOutcomes; i++) {
        const outcomeValue = parseInt(document.getElementById(`outcomeType${i + 1}`).value) || 0;
        const numerator = outcomeValue;
        const denominator = totalOutcomes;

        const divisor = gcd(numerator, denominator);
        const simplifiedNumerator = numerator / divisor;
        const simplifiedDenominator = denominator / divisor;

        const probability = `${numerator}/${denominator} = ${simplifiedNumerator}/${simplifiedDenominator}`;
        probabilities.push(`P(Type ${i + 1}) = ${probability}`);
    }

    resultDisplay.innerHTML = `<strong>Calculated Probabilities:</strong><br>${probabilities.join('<br>')}`;
    resultDisplay.style.display = 'block';
    outcomeInputsDiv.innerHTML = ''; // Clear outcome inputs
    calculateButton.style.display = 'none';
    refreshButton.style.display = 'inline-block'; // Show refresh button
});
