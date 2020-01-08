import React from "react"

function Logo(){
    const style = {
        height: "25vmin"
    }

    return (
        <img src={require("./first_logo.png")} style={style} alt="logo" />
    )
}

export default Logo