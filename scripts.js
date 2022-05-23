let num1 = 0, num2 = 0;
let screenValue = document.querySelector('.value');
let currentOperation = document.querySelector('.operation').textContent;
const digits = Array.from(document.querySelectorAll('.digit'));
digits.forEach(digit => digit.addEventListener('click', function(e) {
    displayValue(e.target.name);
}));

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

function operate(operator, num1, num2) {
    if (operator === '+') {
        return add(num1,num2);
    } else if (operator === '-') {
        return subtract(num1,num2);
    } else if (operator === '*') {
        return multiply(num1,num2);
    } else if (operator === '/') {
        return divide(num1,num2);
    } else if (operator === '%') {
        return percent(num1,num2);
    }
}

function displayValue(value) {
    const currentValue = screenValue.textContent;
    let newValue;

    if (value === 'sign') {
        if (currentValue.charAt(0) === '-') {
            newValue = currentValue.substring(1);
        } else {
            newValue = '-' + currentValue;
        }
    }

    else if (value === 'decimal') {
        if (currentValue.includes('.')) {
            newValue = currentValue;
        } else {
            newValue = currentValue + '.';
        }
    }

    else {
        if (currentValue.length === 1 && currentValue.charAt(0) === '0') {
            newValue = value;
        } else if (currentValue.length === 2 && currentValue.charAt(0) === '-' && currentValue.charAt(1) === '0') {
            newValue = '-' + value;
        } else {
            newValue = currentValue + value;
        }
    }

    screenValue.textContent = newValue;
}