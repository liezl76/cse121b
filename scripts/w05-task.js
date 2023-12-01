/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.getElementById('temples');

const templeList = [];

const displayTemples = (templesArray) => {
    templesArray.forEach((temple) => {
    
    //Create an HTML <article> element (createElement)
    const templeArticle = document.createElement('article');

    //Create HTML <h3> element and add the temple's templeName property to nis new element
    const templeNameHeading = document.createElement('h3');
    templeNameHeading.textContent = temple.templeName;

    //Create HTML <img> element and add the temple's imageUrl property to the src attribute and the temple's location property to the alt attribute
    const templeImage = document.createElement('img');
    templeImage.src = temple.imageUrl;
    templeImage.alt = temple.location;

    //append <h3> element and the <img> element to the <article> element as children
    templeArticle.appendChild(templeNameHeading);
    templeArticle.appendChild(templeImage);

    //Append the <article>element to the global templeElement variable declared in Step 2
    templesElement.appendChild(templeArticle);
    });
};

/* async displayTemples Function */

/* async getTemples Function using fetch()*/
const getTemples = async () => {
    //
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
    //
    const templeData = await response.json();

    console.log(templeData);
    //
    templeList.push(...templeData);
    //
    displayTemples(templeList);
};

/* reset Function */
const reset = () => {
    //Get all <article> elements inside templesElement
    const articles = templesElement.querySelectorAll('article');

    //Remove each <article> element
    articles.forEach((article) => {
        templesElement.removeChild(article);
    });
};

reset(); //Call reset to clear the displayed list of temples

/* sortBy Function */
const sortBy = (temples) => {
    //Call the reset function to clear the output
    reset();

    //Obtain the value of the HTML element with the ID of sortBy
    const filter = document.getElementById('#sortBy').value;

    //Use a switch statement to handle different filter cases
    switch (filter) {
        case 'utah':
            //Filter for temples in Utah
            displayTemples(temples.filter(temple => temple.location.includes('Utah')));
            break;

        case 'notutah':
            //Filter for temples outside of Utah
            displayTemples(temples.filter(temple => !temple.location.includes('Utah')));
            break;

        case 'older':
            //Filter for temples built before 1950
            displayTemples(temples.filter(temple => new Date(temple.dedicated) < new Date(1950, 0, 1)));
            break;

        case 'all':
        default:
            displayTemples(temples); //No filter, display all temples
            break;
    }
};

sortBy(templeList); //Call sortBy and pass the list of temples

getTemples();

/* Event Listener */
document.querySelector("#sortBy").addEventListener("change", () => {
    //Call the sortBy function and pass the templeList as the argument
    sortBy(templeList);
});
