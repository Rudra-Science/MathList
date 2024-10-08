function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Level-based difficulty scale (Godly++++ difficulty at level 10)
function generateLinearEquation(level) {
    const a = getRandomInt(1, 5 * level);  // coefficients scale faster
    const b = getRandomInt(-5 * level, 5 * level);
    const c = getRandomInt(10 * level, 50 * level);
    return `Solve for x: ${a}x + ${b} = ${c}`;
}

function generateAlgebraicExpression(level) {
    const coeff1 = getRandomInt(1, 10 * level);
    const coeff2 = getRandomInt(1, 10 * level);
    const variable = String.fromCharCode(getRandomInt(97, 122)); // a-z variable
    const exponent = level >= 7 ? `^${getRandomInt(2, level)}` : ''; // Exponents appear from level 7
    return `Simplify the expression: ${coeff1}(${variable}${exponent} + ${getRandomInt(1, 5 * level)}) + ${coeff2}${variable}`;
}

function generateMensurationQuestion(level) {
    const radius = getRandomInt(5 * level, 10 * level);
    const height = getRandomInt(10 * level, 20 * level);
    if (level <= 5) {
        return `Find the area of a circle with radius ${radius} units.`;
    } else {
        return `Calculate the volume of a cylinder with radius ${radius} units and height ${height} units.`;
    }
}

function generateExponentQuestion(level) {
    const base = getRandomInt(2, 10 * level);
    const exponent = getRandomInt(2, 10);
    if (level >= 8) {
        return `Simplify the expression: (${base}^${exponent})^${getRandomInt(2, 3)} (Godly++++ difficulty)`;
    } else {
        return `What is ${base} raised to the power of ${exponent}?`;
    }
}

function generateFactorizationQuestion(level) {
    const num = getRandomInt(50 * level, 200 * level);
    return `Factorize the quadratic expression: x^2 + ${num}x + ${getRandomInt(1, 50 * level)}`;
}

function generateQuadrilateralQuestion(level) {
    const side1 = getRandomInt(10 * level, 20 * level);
    const side2 = getRandomInt(10 * level, 20 * level);
    const diagonal = Math.sqrt(side1 ** 2 + side2 ** 2).toFixed(2);
    if (level >= 9) {
        return `Calculate the diagonal length of a quadrilateral with sides ${side1} units and ${side2} units (Godly++++ difficulty).`;
    } else {
        return `What is the area of a rectangle with sides ${side1} units and ${side2} units?`;
    }
}

function generateProfitLossQuestion() {
    const costPrice = getRandomInt(100, 500);
    const sellingPrice = getRandomInt(50, 1000);
    const profitLoss = sellingPrice - costPrice;
    const profitLossPercentage = ((profitLoss / costPrice) * 100).toFixed(2);
    return `Cost Price: $${costPrice}, Selling Price: $${sellingPrice}. What is the profit/loss?`;
}

function generateTaxQuestion() {
    const amount = getRandomInt(100, 1000);
    const taxRate = getRandomInt(5, 20); // Tax rate between 5% and 20%
    return `For an amount of $${amount}, calculate the tax amount at a rate of ${taxRate}%.`;
}

function generateInterestQuestion() {
    const principal = getRandomInt(1000, 5000);
    const rate = getRandomInt(5, 15); // Interest rate between 5% and 15%
    const time = getRandomInt(1, 5); // Time in years
    return `For a principal amount of $${principal} at an interest rate of ${rate}% for ${time} years, what is the Simple Interest? What is the Compound Interest?`;
}


function generateNumberSystemQuestion(level) {
    const number = getRandomInt(1, 100);
    return `Convert the decimal number ${number} to binary.`;
}

function generateRationalNumberQuestion(level) {
    const numerator1 = getRandomInt(1, 20);
    const denominator1 = getRandomInt(1, 20);
    const numerator2 = getRandomInt(1, 20);
    const denominator2 = getRandomInt(1, 20);

    const operation = getRandomInt(1, 4); // 1: Addition, 2: Subtraction, 3: Multiplication, 4: Division

    switch (operation) {
        case 1:
            return `What is the sum of the rational numbers ${numerator1}/${denominator1} and ${numerator2}/${denominator2}?`;
        case 2:
            return `What is the difference when you subtract ${numerator2}/${denominator2} from ${numerator1}/${denominator1}?`;
        case 3:
            return `What is the product of the rational numbers ${numerator1}/${denominator1} and ${numerator2}/${denominator2}?`;
        case 4:
            return `What is the quotient when you divide ${numerator1}/${denominator1} by ${numerator2}/${denominator2}?`;
        default:
            return "No question available.";
    }
}


function generateDirectInverseProportionQuestion(level) {
    const x = getRandomInt(1, 10);
    const y = getRandomInt(1, 10);
    return `If y is directly proportional to x and y = ${y} when x = ${x}, what is the value of y when x = ${x + 5}?`;
}

// Update the generateQuestion function to include these topics
function generateQuestion(level, topic) {
    const questionTypes = {
        algebra: [generateLinearEquation, generateAlgebraicExpression],
        mensuration: [generateMensurationQuestion],
        exponents: [generateExponentQuestion],
        factorization: [generateFactorizationQuestion],
        quadrilaterals: [generateQuadrilateralQuestion],
        comparingQuantities: [
            generateProfitLossQuestion,
            generateTaxQuestion,
            generateInterestQuestion
        ],
        number_system: [generateNumberSystemQuestion],
        rational_numbers: [generateRationalNumberQuestion],
        direct_proportions: [generateDirectInverseProportionQuestion],
        // Add more topics here as needed
    };

    const topicQuestions = questionTypes[topic] || [];
    if (topicQuestions.length === 0) return "No questions available for this topic.";
    return topicQuestions[getRandomInt(0, topicQuestions.length - 1)](level);
}



function generateQuestions(numQuestions, level, topic) {
    const questions = [];
    for (let i = 0; i < numQuestions; i++) {
        questions.push(generateQuestion(level, topic));
    }
    return questions;
}

document.getElementById('generateBtn').addEventListener('click', () => {
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = ''; // Clear previous questions

    const level = parseInt(document.getElementById('levelSelect').value);
    const topic = document.getElementById('topicSelect').value;
    const numQuestions = parseInt(document.getElementById('questionCount').value) || 10;

    const questions = generateQuestions(numQuestions, level, topic);

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.textContent = `${index + 1}. ${question}`;
        questionsDiv.appendChild(questionElement);
    });
});

document.getElementById('generateBtn').addEventListener('click', () => {
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = ''; // Clear previous questions

    const level = parseInt(document.getElementById('levelSelect').value);
    const topic = document.getElementById('topicSelect').value;
    const numQuestions = parseInt(document.getElementById('questionCount').value) || 10;

    const questions = generateQuestions(numQuestions, level, topic);

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.textContent = `${index + 1}. ${question}`;
        questionsDiv.appendChild(questionElement);
    });

    // Show the clear button and hide the generate button
    document.getElementById('clearBtn').style.display = 'block';
    document.getElementById('generateBtn').style.display = 'none';
});

document.getElementById('clearBtn').addEventListener('click', () => {
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = ''; // Clear the questions

    // Hide the clear button and show the generate button
    document.getElementById('clearBtn').style.display = 'none';
    document.getElementById('generateBtn').style.display = 'block';
});

document.getElementById('clearBtn').addEventListener('click', () => {
    const confirmation = confirm("Are you sure you want to clear questions?");
    if (confirmation) {
        const questionsDiv = document.getElementById('questions');
        questionsDiv.innerHTML = ''; // Clear the questions

        // Hide the clear button and show the generate button
        document.getElementById('clearBtn').style.display = 'none';
        document.getElementById('generateBtn').style.display = 'block';
    }
});
