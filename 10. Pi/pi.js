// Maximum value for base used in calculations
const Base = Math.pow(10, 11);

// Number of digits in each array item
const cellSize = Math.floor(Math.log(Base) / Math.LN10);

// Function to initialize an array with a given integer
function makeArray(n, aX, Integer) {
    for (let i = 1; i < n; i++) {
        aX[i] = null; // Initialize other elements to null
    }
    aX[0] = Integer; // Set the first element to the given integer
}

// Function to check if an array is empty
function isEmpty(aX) {
    for (let i = 0; i < aX.length; i++) {
        if (aX[i]) {
            return false; // Return false if any element is not null
        }
    }
    return true; // Return true if all elements are null
}

// Function to add two large numbers
function Add(n, aX, aY) {
    let carry = 0; // Initialize carry
    for (let i = n - 1; i >= 0; i--) {
        aX[i] += Number(aY[i]) + Number(carry);
        if (aX[i] < Base) {
            carry = 0; // No carry needed
        } else {
            carry = 1; // Set carry for next iteration
            aX[i] -= Number(Base);
        }
    }
}

// Function to subtract two large numbers
function Sub(n, aX, aY) {
    for (let i = n - 1; i >= 0; i--) {
        aX[i] -= aY[i];
        if (aX[i] < 0) {
            if (i > 0) {
                aX[i] += Base; // Adjust the current slot
                aX[i - 1]--; // Borrow from the next slot
            }
        }
    }
}

// Function to multiply a large number by a small number
function Mul(n, aX, iMult) {
    let carry = 0;
    for (let i = n - 1; i >= 0; i--) {
        let prod = (aX[i]) * iMult + carry;
        if (prod >= Base) {
            carry = Math.floor(prod / Base); // Calculate carry
            prod -= (carry * Base); // Adjust product
        } else {
            carry = 0; // No carry
        }
        aX[i] = prod; // Store result
    }
}

// Function to divide a large number by a small number
function Div(n, aX, iDiv, aY) {
    let carry = 0;
    for (let i = 0; i < n; i++) {
        let currVal = Number(aX[i]) + Number(carry * Base); // Add carry
        let theDiv = Math.floor(currVal / iDiv); // Division
        carry = currVal - theDiv * iDiv; // Calculate new carry
        aY[i] = theDiv; // Store result
    }
}

// Function to compute the arctangent using Taylor series
function arctan(iAng, n, aX) {
    let iAng_squared = iAng * iAng;
    let k = 3; // Starting coefficient in the series
    let sign = 0; // Initialize sign for alternating series

    makeArray(n, aX, 0); // Initialize aX for arctan
    let aAngle = new Array(n);
    makeArray(n, aAngle, 1); // Start with aAngle = 1

    // Calculate 1/iAng
    Div(n, aAngle, iAng, aAngle);
    Add(n, aX, aAngle); // Add the first term to aX

    while (!isEmpty(aAngle)) {
        Div(n, aAngle, iAng_squared, aAngle); // Update aAngle
        let aDivK = new Array(n);
        Div(n, aAngle, k, aDivK); // Calculate aAngle/k

        if (sign) {
            Add(n, aX, aDivK); // Alternate addition
        } else {
            Sub(n, aX, aDivK); // Alternate subtraction
        }

        k += 2; // Increment k for the series
        sign = 1 - sign; // Alternate sign
    }
}

// Function to calculate π using Machin's formula
function calcPI(numDec) {
    const t1 = new Date();
    numDec = Number(numDec) + 5; // Increase precision
    const arrayLength = Math.ceil(1 + numDec / cellSize);
    const aPI = new Array(arrayLength);
    const aArctan = new Array(arrayLength);
    const iAng = [5, 239, 0]; // Angles for arctan
    const coeff = [4, -1, 0]; // Coefficients for the series

    makeArray(arrayLength, aPI, 0); // Initialize aPI

    // Calculate π/4 using Machin's formula
    for (let i = 0; coeff[i] !== 0; i++) {
        arctan(iAng[i], arrayLength, aArctan); // Compute arctan
        Mul(arrayLength, aArctan, Math.abs(coeff[i])); // Multiply by coefficient

        if (coeff[i] > 0) {
            Add(arrayLength, aPI, aArctan); // Add to π
        } else {
            Sub(arrayLength, aPI, aArctan); // Subtract from π
        }
    }

    Mul(arrayLength, aPI, 4); // Multiply final result by 4

    // Format π for output
    let tempPI = aPI.map(num => String(num).padStart(cellSize, '0')).join('');
    let sPI = '';

    for (let i = 0; i <= numDec; i++) {
        if (i === 0) {
            sPI += tempPI.charAt(i) + ".<br>"; // Add decimal point after the first digit
        } else {
            sPI += tempPI.charAt(i);
            if (i % 50 === 0 && i !== 0) {
                sPI += "<br>"; // New line after every 50 digits
            } else if (i % 5 === 0) {
                sPI += " "; // Space every 5 digits
            }
        }
    }

    const t2 = new Date();
    const timeTaken = (t2.getTime() - t1.getTime()) / 1000;

    // Output the result
    const myDiv = document.getElementById("d1");
    myDiv.innerHTML = `PI (${numDec})=${sPI}<br>It took: ${timeTaken} seconds`;
}
