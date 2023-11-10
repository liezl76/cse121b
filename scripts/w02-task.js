/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
let fullname = "Liezl Gonzaga Lizardo";
let currentYear = "2023";
let profilePicture = "images/liezl.jpg";

/* Step 3 - Element Variables */
const nameElement = document.getElementById("name");
const foodElement = document.getElementById("food");
const yearElement = document.querySelector("#year");
const imageElement = document.querySelector("picture img");

/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullname}</strong>`;
imageElement.setAttribute("src", profilePicture);
imageElement.setAttribute("alt", `Profile image of" ${fullname}`);

/* Step 5 - Array */
const favoriteFood = ["Adobo", "Pizza", "Fried Chicken", "Bihon", ];
foodElement.innerHTML = favoriteFood;
const otherFood = "Spaghetti";
favoriteFood.push(otherFood);
foodElement.innerHTML += `<br>${favoriteFood}</br>`;
favoriteFood.shift();
foodElement.innerHTML += `<br>${favoriteFood}</br>`;
favoriteFood.pop();
foodElement.innerHTML += `<br>${favoriteFood}</br>`;
