const apiKey = 'ceeba5a5'; // Replace with your OMDB API key

document.getElementById('searchBtn').addEventListener('click', function () {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
      searchMovies(query);
    }
  });
  
  async function searchMovies(query) {
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    const loader = document.getElementById('loader');
    const movieList = document.getElementById('movieList');
    
    // Show the loader and clear previous results
    loader.classList.remove('hidden');
    movieList.innerHTML = '';
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      // Hide the loader after data is received
      loader.classList.add('hidden');
      
      if (data.Response === 'True') {
        displayMovies(data.Search);
      } else {
        movieList.innerHTML = '<p class="text-center text-red-500">No movies found!</p>';
      }
    } catch (error) {
      console.error(error);
      loader.classList.add('hidden'); // Hide loader in case of an error
      movieList.innerHTML = '<p class="text-center text-red-500">An error occurred. Please try again.</p>';
    }
  }
  
  function displayMovies(movies) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = ''; // Clear previous results
    movies.forEach(movie => {
      const movieCard = `
        <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}" class="w-full h-64 object-cover rounded-md mb-4">
          <h2 class="text-2xl font-bold mb-2">${movie.Title}</h2>
          <p class="text-sm text-gray-400 mb-4">${movie.Year}</p>
          <p class="text-indigo-500">Type: ${movie.Type}</p>
          <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md mt-4 block text-center">View on IMDB</a>
        </div>
      `;
      movieList.innerHTML += movieCard;
    });
  }