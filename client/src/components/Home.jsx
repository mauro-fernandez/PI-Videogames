import React, { useEffect, useState } from "react"
import { useDispatch , useSelector } from "react-redux"
import { getAllVideogames } from "../redux/actions"
import { Link } from "react-router-dom"
import Card from "./Card"


export default function HomePage() {

    const dispatch = useDispatch()
    const allVideogames = useSelector ((state) => state.videogames)
 
    useEffect( () => {
        dispatch(getAllVideogames)
    },[dispatch]) //ver bien esto

    function handleClick(event){
        event.preventDefault()
        dispatch(getAllVideogames())
    }

    return (
        <div>
            <Link to="/videogames">Create Videogame</Link>
            <h1>Viendo si puedo crear un juego</h1>
            <button onClick={e => handleClick(e)}>
                volver a cargar los videojuegos
            </button>
            <div>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select>
                    <option value="all">Videojuegos existentes</option>
                    <option value="created">Videojuegos creados por nosotros</option>
                    <option value="genre">Genero</option>        
                </select>
                {
                    allVideogames?.map(el =>{
                        return(
                        <Card name={el.name} image={el.image} genre={el.image}></Card>
                    )})
                }
            </div>
        </div>
    )

    
}