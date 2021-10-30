const { Videogame , Genre } = require("../db")
const axios = require("axios")

const getApiVideogames = async (name) => {
    const search = name ? `&search=${name}` : "";
    const result = await axios.get(`https://api.rawg.io/api/games?key=ea70fa1cd2bd440c873a140108765b59&page_size=100${search}`)
    
    return result.data.results.map(element => ({
        id: element.id,
        name: element.name,
        // description: element.description,
        rating: element.rating,
        released: element.released,
        platforms: element.platforms.map(platform => platform.platform.name),
        genres: element.genres.map(genre => genre.name),
        image: element.background_image
    }));
}

const getOneApiVideogame = async (idVideogame) => {
    try {
        const result = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=ea70fa1cd2bd440c873a140108765b59`)
        const element = result.data;
        return {
            id: element.id,
            name: element.name,
            description: element.description,
            rating: element.rating,
            released: element.released,
            platforms: element.platforms.map(platform => platform.platform.name),
            genres: element.genres.map(genre => genre.name),
            image: element.background_image
        };
    } catch (err) {
        if (err.response.status === 404) return undefined
        else throw err
    }
}

const getDataBaseInfo = async (name) => {
    const where = name ? { name } : {};

    return Videogame.findAll({
        ...where,
        includes: {
            model: Genre,
            as: "genres",
            through: { attributes: ["name"] }
        }
    })
}

const getOneDataBaseInfo = async (idVideogame) => {
    try {
        const videogame = await Videogame.findByPk(idVideogame, {
            includes: {
                model: Genre,
                as: "genres",
                through: { attributes: ["name"] }
            }
        })
        return videogame;
    } catch (err) {
        return undefined;
    }
}

const getAllVideogames = async (name) => {
    const prom1 = getApiVideogames(name);
    const prom2 = getDataBaseInfo(name)
    const [apiInfo, dataBaseInfo] = await Promise.all([prom1, prom2]);
    return [...apiInfo, ...dataBaseInfo]
}

const getOneVideogame = async (idVideogame) => {
    const prom1 = getOneApiVideogame(idVideogame);
    const prom2 = getOneDataBaseInfo(idVideogame);
    const [apiInfo, dataBaseInfo] = await Promise.all([prom1, prom2]);
    return apiInfo || dataBaseInfo;
}

module.exports = {
    getAllVideogames,
    getOneVideogame
}