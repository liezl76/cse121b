/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(number1,number2){
    return number1 + number2;
}

function addNumber(){
    let addNumber1 = Number(document.querySelector('#add1').value);
    let addNumber2 = Number(document.querySelector('#add2').value);
    document.getElementById('sum').value = add(addNumber1, addNumber2);
}

document.querySelector('#addNumbers').addEventListener("click",addNumber);

/* Function Expression - Subtract Numbers */
function subtract(number1,number2){
    return number1 - number2;
}

function subtractNumbers(){
    let subtract1 = Number(document.querySelector('#subtract1').value);
    let subtract2 = Number(document.querySelector('#subtract2').value);
    document.getElementById('difference').value = subtract(subtract1, subtract2);
}

document.querySelector('#subtractNumbers').addEventListener("click",subtractNumbers);

/* Arrow Function - Multiply Numbers */
function multiplyNumbers(number1,number2){
    return number1 * number2;
}

function multiply(){
    let factor1 = Number(document.querySelector('#factor1').value);
    let factor2 = Number(document.querySelector('#factor2').value);
    document.getElementById('product').value = multiplyNumbers(factor1, factor2);
}

document.querySelector('#multiplyNumbers').addEventListener('click',multiply);

/* Open Function Use - Divide Numbers */
function divideNumbers(number1,number2){
    return number1 / number2;
}

function divide(){
    let dividend = Number(document.querySelector('#dividend').value);
    let divisor = Number(document.querySelector('#divisor').value);
    document.getElementById('quotient').value = divideNumbers(dividend,divisor);
}

document.querySelector('#divideNumbers').addEventListener('click',divide);

/* Decision Structure */
const subtotalInput = document.getElementById('subtotal');
const memberCheckbox = document.getElementById('member');
const totalSpan = document.getElementById('total');
const getTotalButton = document.getElementById('getTotal');

document.querySelector('#getTotal').addEventListener('click', calculateTotal);

function calculateTotal() {
  const subtotal = parseFloat(subtotalInput.value);
  const isMember = memberCheckbox.checked;
  const discount = isMember ? 0.15 : 0;
  const total = subtotal - (subtotal * discount);
  document.querySelector('#total').textContent = `$ ${total.toFixed(2)}`;
}

/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
document.querySelector('#array').textContent = numbersArray;

/* Output Odds Only Array */
document.querySelector('#odds').textContent = numbersArray.filter((num) => num % 2 ===1);
/* Output Evens Only Array */
document.querySelector('#evens').textContent = numbersArray.filter((num) => num % 2 ===0);
/* Output Sum of Org. Array */
document.querySelector('#sumOfArray').textContent = numbersArray.reduce(sumFunction);

function sumFunction(total, num){
    return total + num;
}

/* Output Multiplied by 2 Array */
document.querySelector('#multiplied').textContent = numbersArray.map(doubleFunction);

function doubleFunction(x){
    return x*2;
}
/* Output Sum of Multiplied by 2 Array */
document.querySelector('#sumOfMultiplied').textContent = numbersArray.map(doubleFunction).reduce(sumFunction);

function sumFunction(){
    return numbersArray.reduce((total, num) => total + num, 0);
}
