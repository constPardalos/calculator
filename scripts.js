// GLOBAL VARIABLES
// ========================
let num1 = 0,
    num2 = 0,
    operator,
    operatorClicked = false,
    equalClicked = false;

const displayValue = document.querySelector('.value'),
    displayOperation = document.querySelector('.operation'),
    buttons = Array.from(document.querySelectorAll('.btn')),
    digits = Array.from(document.querySelectorAll('.digit')),
    operators = Array.from(document.querySelectorAll('.operator')),
    equal = document.querySelector('.equal'),
    clear = document.querySelector('.clear'),
    del = document.querySelector('.delete'),
    calcDisplay = document.querySelector('.screen'),
    lightSwitch = document.querySelector('.light-switch'),
    maxValueLength = 21,
    valueRegex = /[^0-9-.]/;

displayValue.style.fontSize = '100%';

// EVENT LISTENERS
// ========================

window.addEventListener('keydown', function (e) {
    const key = document.querySelector(`button[data-key="${e.key}"]`);
    if (key) {
        key.click();
    }
});

buttons.forEach(button => button.addEventListener('click', function (e) {
    styleOnClick(e.currentTarget);
}));

digits.forEach(digit => digit.addEventListener('click', function (e) {
    updateDisplayValue(e.target.dataset.key);
}));

operators.forEach(operatorKey => operatorKey.addEventListener('click', function (e) {
    if (displayOperation.textContent && !displayOperation.textContent.includes('=') && !operatorClicked) {
        operate(operator, num1, num2);
        setOperation(e.target.textContent);
    } else {
        setOperation(e.target.textContent);
    }
}));

equal.addEventListener('click', () => {
    if (!equalClicked && !operatorClicked) {
        operate(operator, num1, num2);
    }
})

clear.addEventListener('click', clearAll);

del.addEventListener('click', () => {
    if (valueRegex.test(displayValue.textContent)) {
        clearAll();
    } else {
        displayValue.textContent = displayValue.textContent.slice(0, -1);
        increaseFontSize();
    }
})

lightSwitch.addEventListener('change', () => {
    document.querySelector('body').classList.toggle('light');
})

// FUNCTIONS
// ========================

function clearAll() {
    num1 = 0;
    num2 = 0;
    operator = '';
    operatorClicked = false;
    equalClicked = false;
    displayValue.textContent = '0';
    displayOperation.textContent = '';
    displayValue.style.fontSize = '100%';
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return 'Cannot divide by zero';
    } else {
        return num1 / num2;
    }
}

function percent(num1, num2) {
    return (num1 / 100) * num2;
}

// Update the operation in the calculator screen and set the operator
function setOperation(symbol) {

    if (valueRegex.test(displayValue.textContent) ||
        displayValue.textContent === '-' ||
        displayValue.textContent === '') {
        return;
    }

    num1 = displayValue.textContent;
    operator = symbol.toString();
    displayOperation.textContent = `${num1} ${operator}`;
    operatorClicked = true;
    equalClicked = false;
}

//
function operate(operator, num1, num2) {
    if (!displayOperation.textContent ||
        !displayValue.textContent ||
        displayValue.textContent === '-' ||
        valueRegex.test(displayValue.textContent)) {
        return;
    }

    num1 = parseFloat(num1);
    num2 = parseFloat(displayValue.textContent);
    const currentOperation = displayOperation.textContent;
    let result;

    if (operator === '+') {
        result = add(num1, num2);
    } else if (operator === '-') {
        result = subtract(num1, num2);
    } else if (operator === '×') {
        result = multiply(num1, num2);
    } else if (operator === '÷') {
        result = divide(num1, num2);
    } else if (operator === '%') {
        result = percent(num1, num2);
    }

    result = result.toString();
    if (result.includes('.') && result.split(".")[1].length > 5) {
        result = parseFloat(result.slice(0, 5 - result.split(".")[1].length));
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

    if (valueRegex.test(currentValue) || currentValue.length >= maxValueLength) {
        return;
    }

    if (equalClicked) {
        displayOperation.textContent = '';
    }

    if (value === 'Insert') {
        if (operatorClicked || equalClicked) {
            newValue = '-';
        } else if (currentValue.charAt(0) === '-') {
            newValue = currentValue.substring(1);
        } else {
            newValue = '-' + currentValue;
        }
    } else if (value === '.') {
        if (operatorClicked || equalClicked || currentValue.length === 0 || currentValue === '0') {
            newValue = '0.';
        } else if (currentValue === '-') {
            newValue = '-0.';
        } else if (currentValue.includes('.')) {
            newValue = currentValue;
        } else {
            newValue = currentValue + '.';
        }
    } else {
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
    while ((displayValue.offsetWidth >= calcDisplay.offsetWidth) && displayValue.style.fontSize !== '0%') {
        displayValue.style.fontSize = `${parseInt(displayValue.style.fontSize.slice(0, -1)) - 5}%`;
    }
}

function increaseFontSize() {
    while ((displayValue.offsetWidth <= calcDisplay.offsetWidth) && displayValue.style.fontSize !== '100%') {
        displayValue.style.fontSize = `${parseInt(displayValue.style.fontSize.slice(0, -1)) + 5}%`;
    }
}

function styleOnClick(target) {
    target.classList.add('clicked');
    setTimeout(() => {
        target.classList.remove('clicked')
    }, 100);
}