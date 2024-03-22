import '../App.css'

function Gallery({ movies }) {

    const getImage = (movie) => {
        let path = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
        return path;
    }

    return(
        <>
            <div>
                <h2>Previous Movies</h2>
                <div className="movie-container">
                    {movies && movies.length > 1 ? (
                        movies.slice(1).map((movie, index) => (
                            <img
                                key={index}
                                className="gallery-image"
                                src={getImage(movie)}
                                width="50"
                            />
                        )
                        )
                    ) : (
                        <div>
                            <h3>No Movies Discovered!</h3>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Gallery