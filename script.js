let display = document.getElementById('display');
let buttons = document.querySelectorAll('.button');
let clearButton = document.getElementById('clear');
let currentNumber = '';
let previousNumber = '';
let operation = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.value === '=') {
            calculate();
        } else if (button.value === 'C') {
            clear();
        } else {
            updateDisplay(button.value);
        }
    });
});

function updateDisplay(value) {
    if (value === '+' || value === '-' || value === '*' || value === '/') {
        previousNumber = currentNumber;
        currentNumber = '';
        operation = value;
    } else {
        currentNumber += value;
    }
    display.value = currentNumber;
}

function calculate() {
    let result;
    switch (operation) {
        case '+':
            result = parseFloat(previousNumber) + parseFloat(currentNumber);
            break;
        case '-':
            result = parseFloat(previousNumber) - parseFloat(currentNumber);
            break;
        case '*':
            result = parseFloat(previousNumber) * parseFloat(currentNumber);
            break;
        case '/':
            result = parseFloat(previousNumber) / parseFloat(currentNumber);
            break;
        default:
            result = currentNumber;
    }
    display.value = result;
    currentNumber = result.toString();
    previousNumber = '';
    operation = '';
}

function clear() {
    display.value = '';
    currentNumber = '';
    previousNumber = '';
    operation = '';
}