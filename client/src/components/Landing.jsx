import React from "react"
import { Link } from "react-router-dom"
import styles from "./Landing.module.css"

export default function LandingPage() {
    return (
        <div className={styles.LandingApi}>
            <div>
            <h1>Videogames API</h1>
            <Link to="/home">
                <button>Welcome to the experience</button>
            </Link>
            </div>
        </div>
    )
}