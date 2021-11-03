import React from "react";

export default function Card({ name , image, genres }){
    return (
        <div>
            <img src={image} alt="Image not found" width="250px" height="200px"></img>
            <h3>{name}</h3>
            <h5>{genres}</h5>
        </div>
    )
}
