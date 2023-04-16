// Get references to the DOM elements
const form = document.querySelector('form');
const movieList = document.querySelector('#movie-list');

// Load the movie data from data.json
const loadMovies = async () => {
  try {
    const response = await fetch('data.json');
    const movies = await response.json();
    return movies;
  } catch (err) {
    console.error(err);
  }
};

// Function to filter movies based on user preferences
const filterMovies = (movies, genre, year, language, rating) => {
  return movies.filter((movie) => {
    return (
      movie.genre === genre &&
      movie.year === year &&
      movie.language === language &&
      movie.rating >= rating
    );
  });
};

// Function to display the filtered movies
const displayMovies = (movies) => {
  movieList.innerHTML = '';
  if (movies.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'No movies found.';
    movieList.appendChild(message);
  } else {
    movies.forEach((movie) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h2>${movie.title}</h2>
        <p>Genre: ${movie.genre}</p>
        <p>Year: ${movie.year}</p>
        <p>Language: ${movie.language}</p>
        <p>Rating: ${movie.rating}</p>
      `;
      movieList.appendChild(li);
    });
  }
};

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const genre = e.target.genre.value;
  const year = e.target.year.value;
  const language = e.target.language.value;
  const rating = e.target.rating.value;

  const movies = await loadMovies();
  const filteredMovies = filterMovies(movies, genre, year, language, rating);
  displayMovies(filteredMovies);
});


