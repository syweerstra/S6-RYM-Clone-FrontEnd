import React from "react";
import "../style/header.css"


function Header(props){
    return(
        <header className={"header"}>
            <img src={"https://e.snmc.io/3.0/img/logo/sonemic-32.png"}></img>
                <a className={"header-item"} href={"/new-music"}> new music </a>
                <a className={"header-item"} href={"/genres"}> genres </a>

            {localStorage.getItem("JWT") !== null ?
                <a href={"/user/" + localStorage.getItem("username")} className={"header-item header-item-profile"}> Profile </a>
                :
                <a href={"/login/"} className={"header-item header-item-profile"}> Login </a>
            }
        </header>
    )
}

export default Header;
