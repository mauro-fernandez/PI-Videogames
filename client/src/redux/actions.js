import axios from "axios"


export function getAllVideogames(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames")
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data
        })
    }
}

export function getAllGenres(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/genres")
        return dispatch({
            type: "GET_GENRES",
            payload: json.data
        })
    }
}

export function filterGamesByRating(payload){
    return {
        type: "FILTER_BY_RATING",
        payload
    }
}