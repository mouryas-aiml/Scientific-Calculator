let display = '0';
let expression = '';
let history = [];

const expressionElement = document.getElementById('expression');
const resultElement = document.getElementById('result');
const historyElement = document.getElementById('history');
const historyContentElement = document.getElementById('historyContent');
const historyBtn = document.getElementById('historyBtn');

historyBtn.addEventListener('click', () => {
  historyElement.classList.toggle('hidden');
});

function updateDisplay() {
  expressionElement.textContent = expression || '0';
  resultElement.textContent = display;
}

function updateHistory() {
  historyContentElement.innerHTML = history
    .map(item => `<div class="history-item">${item}</div>`)
    .join('');
}

function handleNumber(num) {
  if (display === '0' || display === 'Error') {
    display = num;
  } else {
    display += num;
  }
  expression += num;
  updateDisplay();
}

function handleOperator(op) {
  if (display !== 'Error') {
    display = '0';
    expression += op;
    updateDisplay();
  }
}

function handleFunction(func) {
  if (display !== 'Error') {
    expression += func + '(';
    display = '0';
    updateDisplay();
  }
}

function clearAll() {
  display = '0';
  expression = '';
  updateDisplay();
}

function deleteLast() {
  if (display.length > 1) {
    display = display.slice(0, -1);
  } else {
    display = '0';
  }
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    // Replace trigonometric functions with their radian versions
    let evalExpression = expression
      .replace(/π/g, 'Math.PI')
      .replace(/sin\(([^)]+)\)/g, (_, angle) => `Math.sin(${angle} * Math.PI / 180)`)
      .replace(/cos\(([^)]+)\)/g, (_, angle) => `Math.cos(${angle} * Math.PI / 180)`)
      .replace(/tan\(([^)]+)\)/g, (_, angle) => `Math.tan(${angle} * Math.PI / 180)`)
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/\^/g, '**')
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    let result = eval(evalExpression);
    result = parseFloat(result.toFixed(8));
    
    display = result.toString();
    expression = result.toString();
    
    history.unshift(`${expression} = ${result}`);
    if (history.length > 10) {
      history.pop();
    }
    
    updateDisplay();
    updateHistory();
  } catch (error) {
    display = 'Error';
    updateDisplay();
  }
}

// Initialize display
updateDisplay();
