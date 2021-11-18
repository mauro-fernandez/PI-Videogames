import React, { useEffect, useState } from "react"
import { useDispatch , useSelector } from "react-redux"
import { getAllVideogames , getAllGenres} from "../redux/actions"
import { Link } from "react-router-dom"
import Card from "./Card"
import Paginado from "./Paginado"


export default function HomePage() {

    const dispatch = useDispatch()
    const allVideogames = useSelector ((state) => state.videogames)
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15)
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage  
    const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
 
    useEffect( () => {
        dispatch(getAllVideogames())
        dispatch(getAllGenres())
    },[dispatch]) //ver bien esto

    function handleClick(event){
        event.preventDefault()
        dispatch(getAllVideogames())
    }

    return (
        <div>
            <h1>Viendo si puedo crear un juego</h1>
            <button onClick={e => handleClick(e)}>
                volver a cargar los videojuegos
            </button>
            <div>
                <select>
                    <option value="genre">GENRE</option>        
                </select>
                <select>
                    <option value="all">ALL VIDEOGAMES</option>
                    <option value="custom">CUSTOM VIDEOGAMES</option>
                </select>
                <select>
                    <option value="asc">A to Z</option>
                    <option value="desc">Z to A</option>
                    <option value="top">TOP RATING</option>
                    <option value="lower">LOWER RATING</option>
                </select>
                <Link to="/videogames">Create Videogame</Link>
                {
                    currentGames?.map(el =>{
                        return(
                            <Card name={el.name} image={el.image} genres={el.genres}></Card>
                        )})
                }
                <Paginado
                    gamesPerPage= {gamesPerPage}
                    allVideogames= {allVideogames.length}
                    paginado={paginado}
                >
                </Paginado>          
            </div>
        </div>
    )

    
}