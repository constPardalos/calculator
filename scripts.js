// GLOBAL VARIABLES
// ========================
let num1 = 0,
    num2 = 0,
    operator,
    operatorClicked = false,
    equalClicked = false;

const displayValue = document.querySelector('.value'),
    displayOperation = document.querySelector('.operation'),
    digits = Array.from(document.querySelectorAll('.digit')),
    operators = Array.from(document.querySelectorAll('.operator')),
    equal = document.querySelector('.equal'),
    clear = document.querySelector('.clear'),
    del = document.querySelector('.delete'),
    calcDisplay = document.querySelector('.screen'),
    maxValueLength = 21;

displayValue.style.fontSize = '100%';

// EVENT LISTENERS
// ========================
digits.forEach(digit => digit.addEventListener('click', function(e) {
    updateDisplayValue(e.target.name);
}));

operators.forEach(operatorKey => operatorKey.addEventListener('click', function(e) {
    if (displayOperation.textContent && !displayOperation.textContent.includes('=') && !operatorClicked) {
        operate(operator, num1, num2);
        setOperation(e.target.dataset.value);
    } else {
        setOperation(e.target.dataset.value);
    }
}));

equal.addEventListener('click', () => {
    if (!equalClicked && !operatorClicked) {
        operate(operator, num1, num2);
    }
})

clear.addEventListener('click', clearAll);

del.addEventListener('click', () => {
    if (displayValue.textContent.includes('zero') || displayValue.textContent.includes('Infinity')) {
        clearAll();
    } else {
        displayValue.textContent = displayValue.textContent.slice(0, -1);
        increaseFontSize();
    }
})

// FUNCTIONS
// ========================

function clearAll() {
    num1 = 0;
    num2 = 0;
    operator ='';
    operatorClicked = false;
    equalClicked = false;
    displayValue.textContent = '0';
    displayOperation.textContent = '';
    displayValue.style.fontSize = '100%';
}

function add(num1,num2) {
    return num1 + num2;
}

function subtract(num1,num2) {
    return num1 - num2;
}

function multiply(num1,num2) {
    return num1 * num2;
}

function divide(num1,num2) {
    if (num2 === 0) {
        return 'Cannot divide by zero';
    } else {
        return num1 / num2;
    }
}

function percent(num1,num2) {
    return (num1 / 100) * num2;
}

// Update the operation in the calculator screen and set the operator
function setOperation(symbol) {

    if (displayValue.textContent.includes('zero') ||
        displayValue.textContent.includes('Infinity')) {
        return;
    }

    num1 = displayValue.textContent;
    operator = symbol;
    displayOperation.textContent = `${num1} ${operator}`;
    operatorClicked = true;
    equalClicked = false;
}

//
function operate(operator, num1, num2) {
    if (!displayOperation.textContent || displayValue.textContent.includes('zero')) {
        return;
    }

    num1 = parseFloat(num1);
    num2 = parseFloat(displayValue.textContent);
    const currentOperation = displayOperation.textContent;
    let result;

    if (operator === '+') {
        result = add(num1,num2);
    } else if (operator === '-') {
        result = subtract(num1,num2);
    } else if (operator === '*') {
        result = multiply(num1,num2);
    } else if (operator === '/') {
        result = divide(num1,num2);
    } else if (operator === '%') {
        result = percent(num1,num2);
    }

    result = result.toString();
    if (result.includes('.') && result.split(".")[1].length > 10) {
        result = parseFloat(result.slice(0, 10 - result.split(".")[1].length));
    }

    displayOperation.textContent = currentOperation + ` ${num2} =`;
    displayValue.textContent = result.toString();
    equalClicked = true;

    displayValue.style.fontSize = '100%';
    decreaseFontSize();
}

// Update the value/result in the calculator screen
function updateDisplayValue(value) {
    const currentValue = displayValue.textContent;
    let newValue;

    if (currentValue.length >= maxValueLength) {
        return;
    }

    if (equalClicked) {
        displayOperation.textContent = '';
    }

    if (value === 'sign') {
        if (operatorClicked || equalClicked) {
            newValue = '-';
        } else if (currentValue.charAt(0) === '-') {
            newValue = currentValue.substring(1);
        } else {
            newValue = '-' + currentValue;
        }
    }

    else if (value === 'decimal') {
        if (operatorClicked || equalClicked || currentValue.length === 0 || currentValue === '0') {
            newValue = '0.';
        } else if (currentValue.includes('.')) {
            newValue = currentValue;
        } else {
            newValue = currentValue + '.';
        }
    }

    else {
        if ((currentValue.length === 1 && currentValue.charAt(0) === '0') || operatorClicked || equalClicked) {
            newValue = value;
        } else if (currentValue.length === 2 && currentValue.charAt(0) === '-' && currentValue.charAt(1) === '0') {
            newValue = '-' + value;
        } else {
            newValue = currentValue + value;
        }
    }

    displayValue.textContent = newValue;
    operatorClicked = false;
    equalClicked = false;

    decreaseFontSize();
}

function decreaseFontSize() {
    while ((displayValue.offsetWidth >= calcDisplay.offsetWidth - 40) && displayValue.style.fontSize !== '0%') {
        displayValue.style.fontSize = `${parseInt(displayValue.style.fontSize.slice(0, -1)) -5}%`;
    }
}

function increaseFontSize() {
    while ((displayValue.offsetWidth <= calcDisplay.offsetWidth - 40) && displayValue.style.fontSize !== '100%') {
        displayValue.style.fontSize = `${parseInt(displayValue.style.fontSize.slice(0, -1)) +5}%`;
    }
}