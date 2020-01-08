import React from "react"
import "./DisplayButton.css"

function DisplayButton(){
    return(
        <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
        </label>
    )
}

export default DisplayButton