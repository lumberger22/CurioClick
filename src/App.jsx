import { useState } from 'react'
import Gallery from './Components/Gallery';
import './App.css'

const ACCESS_KEY = import.meta.env.MOVIE_API_ACCESS_KEY;

function App() {
  const [currentMovie, setCurrentMovie] = useState({});
  const [prevMovies, setPrevMovies] = useState([]);
  const [bannedGenres, setBannedGenres] = useState([]);
  const [inputs, setInputs] = useState({
    language: 'en-US',
    page: '1',
    genre: '28',
    release: '',
  });

  const genres = {
    28: 'Action',
    12: 'Adventure' ,
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    14: 'Fantasy' ,
    10751: 'Family',
    18: 'Drama',
    9648: 'Mystery',
    10402: 'Music',
    27: 'Horror',
    36: 'History',
    53: 'Thriller',
    10770: 'TV Movie',
    878: 'Science Fiction',
    10749: 'Romance',
    10752: 'War',
    37: 'Western'
  }

  const makeQuery = async () => {
    let bannedGenresString = bannedGenres.join(',');
    let query = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${inputs.page}&without_genres=${bannedGenresString}`;

    let index = randomNum(20);
    let movie = await callAPI(query, index).catch(console.error);
    console.log(movie);
    
    while (movie.poster_path === "" || movie.poster_path === null) {
      index = randomNum(20);
      console.log(index);
      movie = await callAPI(query, index).catch(console.error);
    }

    setCurrentMovie(movie);
    setPrevMovies([...prevMovies, currentMovie]);
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTAxODZhNzFjOTE2YzUyNGFiNzFmMzc1OGE4NTUwZiIsInN1YiI6IjY1ZmJiNjZiMDQ3MzNmMDE3ZGU3OWE1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5YIcE5WrEuQMi3dluAir37OnJeBksdbu1q7ov7h2zzA'
    }
  };

  const randomNum = (max) => {
    return Math.floor(Math.random() * max);
  }

  const callAPI = async (query, index) => {
    console.log("New API call");
    let num = randomNum(500);
    setInputs({page: num});

    let response = await fetch(query, options);
    let json = await response.json();
    return json.results[0];
  }

  const getImage = (movie) => {
    let path = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    return path;
  }

  const banGenre = e => {
    const index = e.target.attributes.getNamedItem("id").value;
    const genreID = currentMovie.genre_ids[index];
    if (bannedGenres.indexOf(genreID) === -1) {
      setBannedGenres([...bannedGenres, genreID]);
    }
  }

  const unbanGenre = e => {
    const genreID = Number(e.target.attributes.getNamedItem("id").value);
    const index = bannedGenres.indexOf(genreID);
    setBannedGenres(bannedGenres.slice(0, index).concat(bannedGenres.slice(index + 1)));
  }

  return (
    <>
    <div className='leftContainer'>
      <Gallery movies={prevMovies}/>
    </div>
    <div className='middleContainer'>
      <h1 className='title'>Discover a Movie</h1>
      {prevMovies.length > 0 ? (
        <h4>Click a genre to filter it out</h4>
      ) : (
        <br></br>
      )}
      <br/>
      <div className='middle-content'>
        {prevMovies.length > 0 ? (
          <div className='movieInfoContainer'>
            <h2>{currentMovie.title}</h2>
            <br/>
            <h3 className='release-date'>Release Date: {currentMovie.release_date}</h3>
            <div>
              <h3>Genres</h3>
              <hr></hr>
              <div className='genre-container'>
                {currentMovie.genre_ids.map((genre, index) => (
                  <h3 onClick={banGenre} className='genre grow' key={index} id={index}>{genres[genre]}</h3>
                ))}
              </div>
            </div>       
        </div>
        
        ) : (
          <h2>Click New Movie to get started</h2>
        )}
        {prevMovies.length > 0 ? (
          <div className='image-container'>
            <img className='currImage' src={getImage(currentMovie)}/>
          </div>
        ) : (
          <br></br>
        )}
      </div>
      <button className='discoverButton' onClick={makeQuery}>New Movie</button>
    </div>
    <div className='rightContainer'>
      <h2>Ban List</h2>
      <h3>Select a movie genre to ban!</h3>
      <hr></hr>
      <div className='ban-list'>
      {bannedGenres.map((genre, index) => (
            <h3 onClick={unbanGenre} className='unban' key={index} id={genre}>{genres[genre]}</h3>
          ))}
      </div>
    </div>
    </>
  )
}

export default App
