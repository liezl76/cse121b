/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.getElementById('temples');

const templeList = [];

const displayTemples = (temples) => {
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


/* reset Function */


/* sortBy Function */



getTemples();

/* Event Listener */
