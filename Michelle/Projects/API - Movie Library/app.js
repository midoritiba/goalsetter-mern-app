//map - functions
//1. display() - 
//2. getData() - access the id after given an input
//3. 


//elements
const input = document.getElementById("movie-search");
const button = document.querySelector('.btn');
const main = document.getElementById("main");

//type input event
button.addEventListener("click", (e) => {
    e.preventDefault();
	main.innerHTML = "";
	createRow();
});

//function get data
async function getId() {
	const movieData = await fetch(`https://www.omdbapi.com/?s=${input.value}&apikey=20dae0a7`);
	return await movieData.json();
}

//function display
async function createRow() {
	const data = await getId();
	data.Search.forEach(item => {
		const element = `
            <div class="card mb-5" data-anchor="${item.imdbID}">
            </div>`;
		main.innerHTML += element;
	});
    //target new attribute with ID
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        let imdbID = card.getAttribute("data-anchor");
        let url = `https://www.omdbapi.com/?apikey=20dae0a7&i=${imdbID}`;
        getData(url, card);
    });
}


// make api request for individual title
async function getData(url, card) {
    try {
        const resObj = await fetch(url);
        const data = await resObj.json();
        display(data, card);
    } catch (error) {
        console.log(error);
    }
}
// function to display detailed movie card
function display(data, card) {
    card.innerHTML += `
        <div class="row">
            <div class="col text-center movie-card py-3">
                <h4>${data.Title}</h4>
            </div>
        </div>

        <div class="row pb-5">
            <div class="col-12 col-md-6 text-center movie-card p-3">
                <img src="${data.Poster}">
            </div>
            <div class="col-12 col-md-6 text-center movie-card mt-5 p-5">
                <p>Released: ${data.Released}</p>
                <p>Runtime: ${data.Runtime}</p>
                <p>Genre: ${data.Genre}</p>
                <p>Actors: ${data.Actors}</p>
                <p>${data.Plot}</p>
                <p>Score: ${data.imdbRating}</p>
            </div>
        </div>
    `
}