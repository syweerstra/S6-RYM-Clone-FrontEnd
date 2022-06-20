import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchDelete} from "../services";
import { useNavigate } from "react-router-dom";
import "../style/user.css";
import {LogoutStorage} from "../UserManagement";

function UserPage(){
    let navigate = useNavigate();
    let username = useParams().username;
    const[userData, setUserData] = useState(null);
    useEffect(() =>
    {
        console.log(username)
        if(username !== null || username.trim() !== '') {
            console.log("token" + localStorage.getItem("JWT"));
            const request = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("JWT")}`
                },
            }

            console.log(request);
            fetch('https://localhost:7000/api/user/' + username, request)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setUserData(data);
                });
        }
    }, []);

    console.log(localStorage.getItem("JWT"));
    if(localStorage.getItem("JWT") === null)
        return Unauthorized();
    else {
        return (
            <div>
                { userData === null ? null : userPageContent() }
            </div>
        )
    }

    function DeleteUser(){
        let emptyBody = {};
        fetchDelete(emptyBody, '/user/deleteUser').then(r =>
        {
        })
        LogoutStorage();
        navigate("../../login");
    }

    function userPageContent(){
        return (
            <div className={"user-page"}>
                <div className={"username-wrapper"}>
                    {username}
                </div>
                <div style={{width: "100%"}} className={"user-info-wrapper"}>
                    <div className={"column"}>
                        <img className={"profile-image"} src={"https://e.snmc.io/i/600/w/d465f34f719feaa0793e1a17c7841f12/7689996"}/>
                    </div>
                    <div className={"column"}>
                        <table className={"user-info"}>
                            <tr>
                                <td> {username} / {userData.age} </td>
                            </tr>
                            <tr>
                                <td> Netherlands </td>
                            </tr>
                            <tr>
                                <td> https://letterboxd.com/{username}/ </td>
                            </tr>
                            <tr>
                                <button className={"login-button"} onClick={DeleteUser}> Delete user </button>
                            </tr>

                        </table>
                    </div>
                </div>
                <div className={"music-wrapper"}>
                    <div className={"music-wrapper-header"}> {username}'s ratings</div>
                    <table className={"rating-table"}>
                        {userData.ratings.map(rating => (
                            <tr id={rating.albumId} className={"music-rating"}>
                                <th> <img src={rating.albumCoverImageURL} className={"music-rating-image"}/> </th>
                                <th>
                                    <div> Apr </div>
                                    <div> 20 </div>
                                    <div> 2022 </div>
                                </th>
                                <th>
                                    {rating.ratingOutOfTen/ 2} stars
                                </th>
                                <th className={"music-rating-names"}>
                                    <div style={{paddingBottom: "2em"}}>
                                <span>
                                     <a href={"/artist/" + rating.artistID} className={"nostyle"}><span className={"artist-name"}> {rating.artistName} </span> </a>
                                    <span> - </span>
                                    <a href={"/album/" + rating.albumID} className={"nostyle"}> <span className={"album-name"}> {rating.albumName}  </span> </a>
                                </span>
                </div>
                                    {/*<div className={"genre-names"}>*/}
                                    {/*    {rating.genres.map(genre =>*/}
                                    {/*        (*/}
                                    {/*            <span> {genre} </span>*/}
                                    {/*        ))}*/}
                                    {/*</div>*/}
                                </th>
                            </tr>
                        ))}
                    </table>

                </div>
            </div>

        )
    }

    function Unauthorized(){
        return(
            <div>
                Unauthorized
            </div>
        )
    }
}

export default UserPage;
