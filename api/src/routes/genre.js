const { Router } = require('express');
const { Videogame, Genre } = require("../db")
const axios = require("axios")

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        let genreDb = await Genre.findAll()
        if (genreDb.length === 0) {
            const genresApiAll = await axios.get("https://api.rawg.io/api/genres?key=ea70fa1cd2bd440c873a140108765b59")
            const genreApi = genresApiAll.data.results.map(genre => ({ id: genre.id, name: genre.name }))
            genreApi.map(genre => Genre.create(genre))
            genreDb = genreApi
        }
        res.send(genreDb)
    } catch (error){
        next(error)
    }
})
    

module.exports = router;