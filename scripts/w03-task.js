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
function subtractNumbers(number1,number2){
    return number1 - number2;
}

function handleSubtractClick(){
    let subtractNumber1 = Number(document.querySelector('#subtract1').value);
    let subtractNumber2 = Number(document.querySelector('#subtract2').value);
    document.getElementById('difference').value = subtractNumbers(subtractNumber1, subtractNumber2);
}

document.querySelector('#subtractNumbers').addEventListener("click",handleSubtractClick);

/* Arrow Function - Multiply Numbers */
function multiplyNumbers(number1,number2){
    return number1 * number2;
}

function multiplyNumbers

/* Open Function Use - Divide Numbers */


/* Decision Structure */


/* ARRAY METHODS - Functional Programming */
/* Output Source Array */

/* Output Odds Only Array */

/* Output Evens Only Array */

/* Output Sum of Org. Array */

/* Output Multiplied by 2 Array */

/* Output Sum of Multiplied by 2 Array */
