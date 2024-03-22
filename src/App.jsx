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
      <h2>Random Movie</h2>
      <br/>
      {prevMovies.length > 0 ? (
        <div className='movieInfoContainer'>
        <h3>Title: {currentMovie.title}</h3>
        <br/>
        <h3>Release Date: {currentMovie.release_date}</h3>
        <div className='genre-container'>
          <h3>Genres: </h3>
          <div>
            {currentMovie.genre_ids.map((genre, index) => (
              <h3 onClick={banGenre} key={index} id={index}>{genres[genre]}</h3>
            ))}
          </div>
        </div>        
        <img className='currImage' src={getImage(currentMovie)}/>
      </div>
      ) : (
        <br></br>
      )}
      <button className='discoverButton' onClick={makeQuery}>New Movie</button>
    </div>
    <div className='rightContainer'>
      <h2>Ban List</h2>
      <h3>Select a movie genre to ban!</h3>
      {bannedGenres.map((genre, index) => (
            <h3 onClick={unbanGenre} key={index} id={genre}>{genres[genre]}</h3>
          ))}
    </div>
    </>
  )
}

export default App
