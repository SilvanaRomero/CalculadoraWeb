let currentInput = ''; // Variable para almacenar el valor que el usuario ingresa en el display
let previousInput = ''; // Variable para almacenar el valor previo antes de las operaciones
let operation = null; // Variable para almacenar la operación seleccionada por el usuario
let openParenthesesCount = 0; //Variable que lleva el conteo de parentesis abiertos
let isOn = true; // Estado de la calculadora

function appendNumber(number) {
    if (!isOn) return; // Verifica si la calculadora está encendida
    currentInput += number;
    updateDisplay();
}

function setOperation(op) {
    if (!isOn || currentInput === '') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}


function clearDisplay() {
    // Limpia el display
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}


function calculateSquareRoot() {
    // Función para calcular la raíz cuadrada
    if (currentInput === '') return;
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    updateDisplay();
}


function updateDisplay() {
    let display = document.getElementById('display');
    if (operation && previousInput !== '') {
        display.value = `${previousInput} ${operation} ${currentInput} = `;
    } else {
        display.value = `${currentInput} `;
    }
}

function addParentheses() {
    if (openParenthesesCount > 0 && (currentInput === '' || isNaN(currentInput.slice(-1)))) {
        // Si hay paréntesis abiertos sin cerrar y el último carácter no es un número, insertar ')'
        currentInput += ')';
        openParenthesesCount--;
    } else {
        // En otros casos, insertar '('
        currentInput += '(';
        openParenthesesCount++;
    }
    updateDisplay();
}




function togglePower() {
    // Función para encender y apagar la calculadora
    isOn = !isOn;
    document.getElementById('display').disabled = !isOn;  // Desactiva el display si está apagado
}

// Función para borrar el último número (flechita)
function deleteLast() {
    currentInput = currentInput.slice(0, -1);  // Elimina el último carácter
    document.getElementById('display').value = currentInput;
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function calculatePercentage() {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}


function calculatePower() {
    // Función para calcular la potencia con base y exponente
    // Verifica que hay un valor en la base y el exponente

    if (currentInput !== '' && previousInput !== '') {
        const base = parseFloat(previousInput);  // La base es el valor anterior
        const exponent = parseFloat(currentInput);  // El exponente es el valor actual
        
        // Calcula la base elevada a la potencia del exponente
        const result = Math.pow(base, exponent);
        
        // Muestra el resultado en el display
        document.getElementById('display').value = result;
        
        // Limpia las variables para el siguiente cálculo
        previousInput = '';
        currentInput = result;
        operation = null;
    } else {
        document.getElementById('display').value = 'Error';
    }
}

function squareNumber() {
    if (currentInput === '') return; // Si no hay número en el display, no hace nada
    const number = parseFloat(currentInput); // Convierte el input actual a número
    const result = Math.pow(number, 2); // Eleva el número al cuadrado
    currentInput = result.toString(); // Actualiza el input actual con el resultado
    updateDisplay(); // Actualiza el display con el nuevo valor
}



function calculateResult() {
    if (previousInput === '' || currentInput === '') return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('No se puede dividir entre 0');
                return;
            }
            result = prev / current;
            break;
        case '^':
            result = Math.pow(prev, current);
            break;
        default:
            return;
    }

 // document.getElementById('display').value = `${prev} ${operation} ${current}\n =\n ${result}`;

    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateDisplay();
}
