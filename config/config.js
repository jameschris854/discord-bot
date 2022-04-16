const dotenv = require('dotenv').config()

const config = {
    DATABASE:process.env.DATABASE,
    DB_PASSWORD:process.env.DB_PASSWORD,
    TMDB_API_KEY:process.env.TMDB_API_KEY,
    TOKEN_TEST:process.env.TOKEN_TEST,
    TOKEN_PROD:process.env.TOKEN_PROD,
    IS_PROD:process.env.IS_PROD,
    MOVIE:process.env.MOVIE,
}

module.exports = config