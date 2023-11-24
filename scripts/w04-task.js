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
  hobbies: ['Listening to Podcast', 'Reading', 'Driving Motorcycle'],
  placesLived: []
};

/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push(
  {
    place: 'San Miguel, Jordan, Guimaras, Philippines',
    length: '42 years'
  }  
);
myProfile.placesLived.push(
    {
      place: 'San Roque, Nueva Valencia, Guimaras, Philippines',
      length: '3 years'
    }  
  );

/* DOM Manipulation - Output */
/* Name */
document.querySelector('#name').textContent = myProfile.name;
/* Photo with attributes */
document.querySelector('#photo').src = myProfile.photo;
document.querySelector('#name').alt = myProfile.name;
/* Favorite Foods List*/
myProfile.favoriteFoods.forEach(food=> {
    let li = document.createElement('li');
    li.textContent = food;
    document.querySelector('#favorite-foods').appendChild(li);
});

/* Hobbies List */
myProfile.hobbies.forEach(hobby => {
  let li = document.createElement('li');
  li.textContent = hobby;
  document.querySelector('#hobbies').appendChild(li);
});

/* Places Lived DataList */
myProfile.placesLived.forEach(place => {
  let dt = document.createElement('dt');
  dt.textContent = place.place;
  let dd = document.createElement('dd');
  dd.textContent = place.length;

  document.querySelector('#places-lived').appendChild(dt);
  document.querySelector('#places-lived').appendChild(dd);
});

