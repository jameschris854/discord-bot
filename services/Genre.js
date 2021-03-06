const { default: axios } = require("axios");

class Genre {

    static movieGenreList = []

    static getGenres = async () => {
        try{
            const genres = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
            )
            this.movieGenreList = genres.data.genres
        }catch(e){
            console.error('could not get genres ...',e)
        }
    }

    static getGenreId = (query) => {
        const genre = this.movieGenreList.find((genre) => {
            return genre.name.toLowerCase() === query.toLowerCase()
        })

        console.log('genre',genre)

        if(genre){
            return genre.id
        }else{
            return null
        }
    }
}

module.exports = Genre