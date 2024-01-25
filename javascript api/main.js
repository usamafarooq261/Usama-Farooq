const apiKey = '36acd940'; 

async function searchMovies(query) {
  try {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    return response.data.Search || [];
  } catch (error) {
    throw new Error('Error fetching movie data');
  }
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById('movies');
  moviesContainer.innerHTML = '';

  if (movies.length === 0) {
    moviesContainer.innerHTML = '<p>No movies found.</p>';
    return;
  }

  movies.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder-image.jpg'; 
    movieItem.innerHTML = `
      <img src="${posterUrl}" alt="${movie.Title}" class="movie-poster">
      <h5>${movie.Title}</h5>
      <p>${movie.Year}</p>
    `;
    moviesContainer.appendChild(movieItem);
  });
}

document.getElementById('searchBtn').addEventListener('click', async () => {
  const searchTerm = document.getElementById('searchInput').value.trim();

  if (searchTerm) {
    try {
      const movies = await searchMovies(searchTerm);
      displayMovies(movies);
    } catch (error) {
      console.error(error.message);
    }
  }
});