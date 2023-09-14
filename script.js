
// DOC elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// Unsplash API URL
let noOfImagesToLoad = 5;
const apiKey = 's4YP6DUfhtRCBRx40XjPNi_BFJ_fZA_lqKeuaJL6G64';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${noOfImagesToLoad}`;

// Change the count no.of images to load
function updateAPIURLWithNewCount(imageCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageCount}`;
}

// Check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded == totalImages) {
        loader.hidden = true;
        ready = true;
        updateAPIURLWithNewCount(30);
    }
}

// Helper function to set Attributes on DOM elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for Links & Images, Add to DOM
function displayPhotos() {

    imagesLoaded = 0;
    totalImages = photoArray.length;
    photoArray.forEach((photo) => {

        const item = document.createElement('a');
        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank'
        })

        const img = document.createElement('img');
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description
        })

        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);

    })
}

// Get Photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    }
    catch(error) {
        // catch error here
    }
}

// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
    if((window.innerHeight + window.scrollY > document.body.offsetHeight - 100) && ready) {
        console.log("load more!");
        ready = false;
        getPhotos();
    }
})

// On Load
getPhotos();
