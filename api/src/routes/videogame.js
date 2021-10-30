const { Router } = require('express');
const { Videogame , Genre } = require("../db")
const { getAllVideogames, getOneVideogame } = require('../controllers/videogames')
const router = Router()

router.get("/", async (req, res, next) => {
    try {
        const name = req.query.name ? req.query.name.toLowerCase() : undefined;
        const videogames = await getAllVideogames(name)
        const shortVideogames = videogames.map(videogame => ({
            id: videogame.id,
            name: videogame.name,
            image: videogame.image,
            genres: videogame.genres,
        }))
        res.status(200).send(shortVideogames)
    } catch (err) {
        next(err)
    }
})

router.get("/:idVideogames", async (req, res, next) => {
    try {
        const idGame = req.params.idVideogames
        const videogame = await getOneVideogame(idGame)
        if (videogame){
            res.status(200).send(videogame)
        } else {
            res.status(404).send({ err: "No se encontró el videojuego" })
        }
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { name, description, released, rating, platforms, genres} = req.body

        const videogameCreated = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
        })

        const proms = genres.map(genreId => videogameCreated.addGenre(genreId));
        await Promise.all(proms)

        res.send({ msg: "Videogame creado con éxito" })
    } catch (err) {
        next(err)
    }
})

module.exports = router;