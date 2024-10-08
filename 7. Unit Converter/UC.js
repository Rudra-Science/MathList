const unitOptions = {
    length: {
        units: {
            "millimeters": 0.001,
            "centimeters": 0.01,
            "meters": 1,
            "kilometers": 1000,
            "inches": 0.0254,
            "feet": 0.3048,
            "yards": 0.9144,
            "miles": 1609.34
        }
    },
    mass: {
        units: {
            "milligrams": 0.001,
            "grams": 1,
            "kilograms": 1000,
            "metric_tons": 1e6,
            "ounces": 28.3495,
            "pounds": 453.592,
            "stones": 6350.29
        }
    },
    temperature: {
        units: {
            "celsius": (value) => value,
            "fahrenheit": (value) => (value - 32) * 5 / 9,
            "kelvin": (value) => value - 273.15
        }
    },
    area: {
        units: {
            "square_millimeters": 1e-6,
            "square_centimeters": 0.0001,
            "square_meters": 1,
            "hectares": 1e4,
            "acres": 4046.86,
            "square_kilometers": 1e6,
            "square_inches": 0.00064516,
            "square_feet": 0.092903,
            "square_yards": 0.836127
        }
    },
    volume: {
        units: {
            "milliliters": 0.001,
            "centiliters": 0.01,
            "deciliters": 0.1,
            "liters": 1,
            "cubic_meters": 1000,
            "gallons": 3.78541,
            "quarts": 0.946353,
            "pints": 0.473176,
            "fluid_ounces": 0.0295735
        }
    },
    speed: {
        units: {
            "meters_per_second": 1,
            "kilometers_per_hour": 0.277778,
            "miles_per_hour": 0.44704,
            "feet_per_second": 0.3048,
            "knots": 0.514444
        }
    },
    data: {
        units: {
            "bytes": 1,
            "kilobytes": 1024,
            "megabytes": 1024 ** 2,
            "gigabytes": 1024 ** 3,
            "terabytes": 1024 ** 4
        }
    },
    time: {
        units: {
            "seconds": 1,
            "minutes": 60,
            "hours": 3600,
            "days": 86400,
            "weeks": 604800
        }
    }
};

function updateUnits() {
    const category = document.getElementById("categorySelect").value;
    const units = unitOptions[category].units;
    const unitFromSelect = document.getElementById("unitFrom");
    const unitToSelect = document.getElementById("unitTo");

    unitFromSelect.innerHTML = '';
    unitToSelect.innerHTML = '';

    if (category === 'numerical') {
        units.forEach(unit => {
            unitFromSelect.innerHTML += `<option value="${unit}">${unit.charAt(0).toUpperCase() + unit.slice(1)}</option>`;
            unitToSelect.innerHTML += `<option value="${unit}">${unit.charAt(0).toUpperCase() + unit.slice(1)}</option>`;
        });
    } else {
        Object.keys(units).forEach(unit => {
            unitFromSelect.innerHTML += `<option value="${unit}">${unit.replace(/_/g, ' ').charAt(0).toUpperCase() + unit.slice(1)}</option>`;
            unitToSelect.innerHTML += `<option value="${unit}">${unit.replace(/_/g, ' ').charAt(0).toUpperCase() + unit.slice(1)}</option>`;
        });
    }

    updatePlaceholders();
}

function convert() {
    const unitFrom = document.getElementById("unitFrom").value;
    const unitTo = document.getElementById("unitTo").value;
    const valueFrom = document.getElementById("valueFrom").value.trim();
    const category = document.getElementById("categorySelect").value;

    if (category === 'numerical' && unitFrom === "binary") {
        if (!/^[01]+$/.test(valueFrom)) {
            alert("Please enter a valid binary number (only 0s and 1s).");
            return;
        }
    } else if (isNaN(valueFrom) || valueFrom === "") {
        alert("Please enter a valid number.");
        return;
    }

    let valueTo;
    if (category === 'temperature') {
        valueTo = convertTemperature(unitFrom, unitTo, parseFloat(valueFrom));
    } else if (category === 'numerical') {
        valueTo = convertNumerical(unitFrom, unitTo, valueFrom);
    } else {
        valueTo = (parseFloat(valueFrom) * unitOptions[category].units[unitFrom]) / unitOptions[category].units[unitTo];
    }

    document.getElementById("valueTo").value = valueTo.toFixed(2);
}

function convertTemperature(unitFrom, unitTo, valueFrom) {
    if (unitFrom === "celsius") {
        if (unitTo === "fahrenheit") return (valueFrom * 9 / 5) + 32;
        if (unitTo === "kelvin") return valueFrom + 273.15;
    } else if (unitFrom === "fahrenheit") {
        if (unitTo === "celsius") return (valueFrom - 32) * 5 / 9;
        if (unitTo === "kelvin") return (valueFrom - 32) * 5 / 9 + 273.15;
    } else if (unitFrom === "kelvin") {
        if (unitTo === "celsius") return valueFrom - 273.15;
        if (unitTo === "fahrenheit") return (valueFrom - 273.15) * 9 / 5 + 32;
    }
    return null;
}


function updatePlaceholders() {
    const unitFrom = document.getElementById("unitFrom").value;
    const unitTo = document.getElementById("unitTo").value;
    const placeholder = `Convert from ${unitFrom.replace(/_/g, ' ')} to ${unitTo.replace(/_/g, ' ')}`;
    document.getElementById("valueFrom").placeholder = placeholder;
}

function clearResult() {
    document.getElementById("valueTo").value = '';
}

// Initialize on page load
updateUnits();
