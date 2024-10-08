document.getElementById('solveButton').addEventListener('click', function() {
    const button = this; // Reference to the button
    const equation = document.getElementById('equation').value;
    const resultElement = document.getElementById('result');

    try {
        const solutions = solveEquation(equation);
        resultElement.textContent = `Solution: ${solutions.join(', ')}`;

        // Change button to refresh functionality
        button.textContent = 'Refresh';
        button.removeEventListener('click', arguments.callee); // Remove previous event listener

        button.addEventListener('click', function() {
            // Refresh the page
            location.reload();
        });

    } catch (error) {
        resultElement.textContent = 'Error: ' + error.message;
    }
});

function solveEquation(equation) {
    // Remove all whitespace
    equation = equation.replace(/\s+/g, '');

    // Check if the equation contains an equals sign
    let leftSide, rightValue;

    if (equation.includes('=')) {
        [leftSide, rightValue] = equation.split('=');
        rightValue = parseFloat(rightValue);
    } else {
        leftSide = equation;
        rightValue = 0; // Default to zero for factorization
    }

    // Check for linear equations
    const linearMatch = leftSide.match(/([+-]?\d*\.?\d*)x([+-]?\d*\.?\d*)?/);
    if (linearMatch) {
        const a = parseFloat(linearMatch[1]) || 1;
        const b = parseFloat(linearMatch[2]) || 0;
        const solution = (rightValue - b) / a;
        return [`x = ${solution}`];
    }

    // Check for quadratic expressions to factor (e.g., x^2 + 1423x + 368)
    const factorMatch = leftSide.match(/([+-]?\d*\.?\d*)x\^2([+-]?\d*\.?\d*)x([+-]?\d*\.?\d*)?/);
    if (factorMatch) {
        const a = parseFloat(factorMatch[1]) || 1;
        const b = parseFloat(factorMatch[2]) || 0;
        const c = parseFloat(factorMatch[3]) || 0;

        return factorQuadratic(a, b, c);
    }

    // Check for standard quadratic equations (e.g., ax^2 + bx + c = 0)
    const quadraticMatch = leftSide.match(/([+-]?\d*\.?\d*)x\^2([+-]?\d*\.?\d*)x?([+-]?\d*\.?\d*)?/);
    if (quadraticMatch) {
        const a = parseFloat(quadraticMatch[1]) || 1;
        const b = parseFloat(quadraticMatch[2]) || 0;
        const c = parseFloat(quadraticMatch[3]) || 0;
        const discriminant = b * b - 4 * a * c;

        const roots = [];
        if (discriminant > 0) {
            const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            roots.push(`x1 = ${root1}`, `x2 = ${root2}`);
        } else if (discriminant === 0) {
            const root = -b / (2 * a);
            roots.push(`x = ${root}`);
        } else {
            roots.push('No real solutions');
        }

        // Factor the quadratic equation
        const factors = factorQuadratic(a, b, c);
        roots.push(`Factors: ${factors}`);
        return roots;
    }

    throw new Error('Unsupported equation format.');
}

function factorQuadratic(a, b, c) {
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        return 'Cannot factor over the reals';
    }

    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    // Build the factorization expression
    return `${a}(x - ${root1})(x - ${root2})`;
}
