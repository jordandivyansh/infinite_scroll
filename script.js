const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash api
let count = 5;
const apiKey = '6YNuPbhpaUP8VAFz-bT98zDfVvCVKcyFBNKPgRa1n2U';
const collection = '1118917';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&collections=${collection}`;

//helper funcn to setattributes
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded ===  totalImages){
        ready = true;   
    }
    if(imagesLoaded===totalImages){
        loader.hidden=true;
        count = 30;
        ready = true;
    }
  
}

// Create elements for links & photos

function displayPhotos(){
    totalImages = photosArray.length;
    imagesLoaded=0;

    photosArray.forEach((photo)=>{
        const item = document.createElement('a');

        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        });

        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            title: photo.alt_description,
            alt: photo.alt_description,
        });
        
        //Event listener to get when loading is finished
        img.addEventListener('load', imageLoaded);
        
        //putting img into anchor
        item.appendChild(img)
        //putting item into image container using DOM
        imageContainer.appendChild(item); 

    });
}



// Get photos from unsplash api
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error){
            //catch
            console.log(error)
    }
}

//  check to see if scrolling near bottom of page so to load more photos

window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready=false;
        getPhotos();
    }
});



//onload
getPhotos();