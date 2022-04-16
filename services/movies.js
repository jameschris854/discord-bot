const { default: axios } = require("axios");
const config = require("../config/config");
const localMovieData = require('../public/data/movieName.json')

const getMoviesList = async (cat = null) => {
    try {
        let randomMovieE
        if (cat) {
            const genreId = Genre.getGenreId(cat)
            randomMovieE = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${config.TMDB_API_KEY}&language=en-US&page=${rand(1, 20)}&include_adult=false&with_genres=${genreId}`
            );
        } else {
            randomMovieE = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${config.TMDB_API_KEY}&language=en-US&page=${rand(1, 20)}&include_adult=false`
            );
        }
        return randomMovieE
    } catch (e) {
        throw new Error('movie api fail', e)
    }

}

const getRandomMovie = (source,randomMovieE) => {
    if (config.MOVIE === 'API' && source === 'API') {
        randomNew = rand(1, 9)
        movieE = randomMovieE.data.results[randomNew].title
        movieEImg = `https://image.tmdb.org/t/p/w500${randomMovieE.data.results[randomNew].poster_path}`
    } else {
        console.log('LOCAL MOVIE');
        randomNew = rand(1, localMovieData.movies.length)
        movieE = localMovieData.movies[rand(0, randomNew)].title
        movieEImg = 'none'
    }

    return {movie: movieE,img:movieEImg}
}


module.exports = { getMoviesList,getRandomMovie }