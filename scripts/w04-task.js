/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
  name: "Liezl G. Lizardo",
  photo: "images/liezl.jpg",
  favoriteFoods: [
    'Rice',
    'Adobo',
    'Ice Cream',
    'Spaghetti'
  ],
  hobbies: ['Listening to Podcast', 'Reading', 'Driving'],
  placesLived: []
};

/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push(
  {
    place: 'San Miguel, Jordan, Guimaras, Philippines',
    lenght: '42 years'
  }  
);
myProfile.placesLived.push(
    {
      place: 'San Roque, Nueva Valencia, Guimaras, Philippines',
      lenght: '3 years'
    }  
  );

/* DOM Manipulation - Output */
/* Name */
document.querySelector('#name').textContent = myProfile.name;
/* Photo with attributes */
document.querySelector('#photo').src = myProfile.photo;
document.querySelector('#name').alt = myProfile.name;
/* Favorite Foods List*/
let favoriteFoods = document.getElementById('favorite-foods');
myProfile.favoriteFoods.forEach(food=> {
    let li = document.createElement('li');
    li.textContent = food;
    document.querySelector('#favorite-foods').appendChild(li);
});

/* Hobbies List */
let hobbiesList = document.getElementById('hobbies');
myProfile.hobbies.forEach(hobby => {
  let listItem = document.createElement('li');
  listItem.textContent = hobby;
  hobbiesList.appendChild(listItem);
});

/* Places Lived DataList */
let placesLivedList = document.getElementById('places-lived');
myProfile.placesLived.forEach(place => {
  let term = document.createElement('dt');
  term.textContent = place.place;

  let description = document.createElement('dd');
  description.textContent = place.length;

  placesLivedList.appendChild(term);
  placesLivedList.appendChild(description);
});

