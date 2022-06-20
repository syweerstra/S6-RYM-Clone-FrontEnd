import React, {useEffect, useState} from "react";
import "../style/login.css"
import {fetchPost} from "../services";
import { useNavigate } from "react-router-dom";

function LoginPage(props){

    let navigate = useNavigate();
    const[username, setUsername] = useState(null);
    const[password, setPassword] = useState(null);

    useEffect(() =>
    {
        localStorage.clear();
    }, []);

    function Login(){
        let ratingDTO = {
            username: username,
            password: password
        }
        fetchPost(ratingDTO, "/auth/login/").then(r =>
        {
            console.log((r));

            if(r !== null) {
                localStorage.setItem("JWT", r.token);
                localStorage.setItem("userId", r.id);
                localStorage.setItem("username", r.username);
                navigate("../user/" + r.username);
            }
        });
    }

return(
    <div className={"login-page"}>
        <div className={"login-header"}> Log in</div>
        <div className={"login-box"}>
            <div> Username </div>
            <input name={"username"} className={"login-input"} value={username} onChange={e => setUsername(e.target.value)}/>
            <div> Password </div>
            <input name={"password"} className={"login-input"} value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <button name={"loginButton"} className={"login-button"} onClick={Login}>
            Log in
        </button>
    </div>
)
}


export default LoginPage;


