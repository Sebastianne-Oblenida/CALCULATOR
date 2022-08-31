let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let nextOperator = null;
let newInput = true;
let displayValue = '0';
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

updateDisplay();

window.addEventListener('keydown', function (e) {
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if (!key) return;
    clicks(key);
});

buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        clicks(button);
    });
});

function clicks(button) {
    if (button.classList.contains('operand')) {
        inputOperand(button.value);
    }
    else if (button.classList.contains('operator')) {
        inputOperator(button);
        operateInput(button);
    }
    else if (button.classList.contains('decimal')) {
        inputDecimal();
    }
    else if (button.classList.contains('clear')) {
        clearInput();
    }
    else if (button.classList.contains('delete')) {
        deleteInput();
    }
    else if (button.classList.contains('equal')) {
        equal();
    }
    updateDisplay();
};

function equal() {
    if (currentOperator.value == 'divide' && displayValue == '0') {
        alert('You can\'t divide by 0!');
        clearInput();
    }
    else if (firstOperand && currentOperator && !nextOperator) {
        const result = operation(firstOperand, currentOperator, displayValue);
        clearInput(result);
    }
};

function inputOperand(operand) {
    if (displayValue.length > 15 && !newInput) return;
    if (newInput || displayValue === '0') {
        displayValue = operand;
        newInput = false;
    }
    else {
        displayValue += operand;
    }
};

function operateInput() {
    if (!firstOperand && currentOperator) {
        firstOperand = displayValue;
    }
    else if (!secondOperand && nextOperator) {
        secondOperand = displayValue;
    }
    if (secondOperand && nextOperator) {
        if (currentOperator.value == 'divide' && secondOperand == '0') {
            alert('You can\'t divide by 0!');
            clearInput();
            return;
        }
        firstOperand = operation(firstOperand, currentOperator, secondOperand);
        displayValue = firstOperand;
        currentOperator = nextOperator;
        nextOperator = null;
        secondOperand = null;
    }
    newInput = true;
};

function inputOperator(operator) {
    if (isNaN(displayValue)) return;
    if (!firstOperand && !currentOperator) {
        currentOperator = operator;
    }
    else if (!secondOperand && !nextOperator) {
        nextOperator = operator;
    }
};

function inputDecimal() {
    if (displayValue.indexOf('.') === -1 && displayValue.length <= 15) {
        displayValue += '.';
    }
};

function operation(num1, operator, num2) {
    num1 = +num1;
    num2 = +num2;
    operator = operator.value
    let res = null;
    if (operator === 'add') {
        res = num1 + num2;
    }
    else if (operator === 'subtract') {
        res = num1 - num2;
    }
    else if (operator === 'product') {
        res = num1 * num2;
    }
    else if (operator === 'divide') {
        res = num1 / num2;
    }
    else if (operator === 'nthRoot') {
        res = Math.pow(num1, 1 / num2);
    }
    else if (operator === 'exponent') {
        res = Math.pow(num1, num2);
    }
    else if (operator === 'mod') {
        res = num1 % num2;
    }
    return res.toString();
};

function clearInput(result='0') {
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    nextOperator = null;
    newInput = true;
    displayValue = result;
};

function deleteInput() {
    displayValue = displayValue.slice(0, -1);
};

function updateDisplay() {
    if (!displayValue) {
        displayValue = '0'
    }
    display.textContent = displayValue;
};
