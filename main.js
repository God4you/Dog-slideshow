let timer;
let deleteFirstFhotoDelay;

async function getData() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all"); //waiting til its finished
    const data = await response.json();
    createBreedList(data.message);
  } catch (error) {
    console.log(
      "There was a problem fetching breed list - here is for the developer what the error is:",
      error
    );
  }
}

getData();
function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList)
          .map(function (breed) {
            return `<option>${breed}</option>`;
          })
          .join("")}
      </select>
      `;
}

//Get data by the breed we want - look at the fetch url
async function loadByBreed(breed) {
  if (breed != "Choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`); //manipulating it to pick what the user picks of a dog breed.
    const data = await response.json();
    createSlideshow(data.message);
  }
}

function createSlideshow(images) {
  let currentPosition = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstFhotoDelay);

  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>
    `;
    currentPosition += 2;
    if (images.length == 2) currentPosition = 0;
    timer = setInterval(nextSlide, 3000);
  } else {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide"></div>
    `;
  }

  function nextSlide() {
    document
      .getElementById("slideshow")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`
      );
    deleteFirstFotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove;
    }, 1000);
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}
