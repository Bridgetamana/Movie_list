const movieContainer = document.getElementById("movie-container");
const key = "1ec7b992";
const searchBox = document.getElementById("search-box");
const form = document.querySelector("form");
const modal = document.getElementById("modal");
const errorMsg = document.getElementById("error-msg");
const closeBtn = document.querySelector(".fa-xmark");
const modalOverlay = document.getElementById("modal-overlay");
const searchHeader = document.querySelector(".search-header");
const Header = document.querySelector("header");
// Function to fetch more details of a movie
const fetchMovieDetails = (imdbID) => {
  fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${key}`)
    .then((res) => res.json())
    .then((data) => {
      modal.innerHTML = `
                <div class="modal-content">
                    
                    <span class="modal-header">
                        <h2>Movie Details</h2>
                        <i class="fa-solid fa-xmark" onclick="closeModal()"></i>
                    </span>

                    <div class='modal-img'>
                        <img src="${data.Poster}" alt="${data.Title}">
                    </div>
                    
                    <span class="modal-body">
                        <h2>${data.Title}</h2>
                        <p>Plot: ${data.Plot}</p>
                        <p>Genre: ${data.Genre}</p>
                        <p>Released: ${data.Released}</p>
                        <p>Runtime: ${data.Runtime}</p>
                        <p>Actors: ${data.Actors}</p>
                        <p>Rated: ${data.Rated}</p>
                        <p>IMDb Rating: ${data.imdbRating}</p>
                        <p>Director: ${data.Director}</p>
                    </span>
                </div>
            `;
      modal.style.display = "block";
      modalOverlay.style.display = "block";
      Header.style.display = "none";

    })
    .catch((err) => {
      console.error("Error fetching movie details:", err);
    });
};

// Function to handle click on "See Details" button
const handleSeeDetailsClick = (imdbID) => {
  fetchMovieDetails(imdbID);
};

// Function to render movie cards

const renderMovieCards = (movies) => {
  movieContainer.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = `
    <div class="movie-card-content" onclick="handleSeeDetailsClick('${movie.imdbID}')">

        <div class="img-wrapper">
            <img src="${movie.Poster}" alt="${movie.Title}"/>
        </div>
        <span class="title-wrapper">
            <h3>${
            movie.Title.length > 20
                ? movie.Title.slice(0, 15) + "..."
                : movie.Title
            }</h3>
            <p class='movie-year'>Year: ${movie.Year}</p>
        </span>
    </div>
        `;
    movieContainer.innerHTML += movieCard;
    searchHeader.style.display = "flex";
  });
};

// Function to fetch movies based on the search query
const fetchMovies = (title) => {
  fetch(`https://www.omdbapi.com/?s=${title}&apikey=${key}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "True") {
        renderMovieCards(data.Search);
      } else {
        errorMsg.innerHTML =
          '<p class="error-msg">No movies found with that title</p>';
          errorMsg.style.display = "flex";
      }
    })
    .catch((err) => {
      errorMsg.style.display = "flex";
    });
};

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchBox.value.trim();
  if (searchTerm !== "") {
    fetchMovies(searchTerm);
  }
});

// Function to close modal
function closeModal() {
  modal.style.display = "none";
  modalOverlay.style.display = "none";
}
