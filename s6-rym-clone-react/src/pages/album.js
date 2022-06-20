import React, {useEffect, useState} from "react";
import "../style/rym.css"
import "../style/album.css"
import {fetchPost, fetchDelete, fetchGet, fetchGetWithBody} from "../services";
import {useParams} from "react-router-dom";

function AlbumPage(props){
    const userID = localStorage.getItem("userId");
    const albumID = useParams().id;
    const[rating, setRating] = useState(null);
    const[albumData, setAlbumData] = useState(null);
    const[initialRating, setInitialRating] = useState(null);

    useEffect(() =>
    {
        fetchGet(albumID, '/music/').then(data => {
            console.log(data);
            setAlbumData(data);
        })
        fetchPost({albumId: albumID, userId: userID}, '/user/rating').then(data => {
            console.log(data)
            // setInitialRating(data);
        })
    }, []);

    function handleChange(e){
        console.log(e.target.value);
        setRating(e.target.value);
    }
    function Rate(){
        if(rating === null)
            return;
        else if(rating === initialRating)
            return;
        else if(rating === "no rating"){
            const deleteRatingDTO = {
                userId: userID,
                albumId: albumID,
            }
            fetchDelete(deleteRatingDTO, "/rate/").then(r => {});
        }
        else{
            const ratingDTO = {
                userId: userID,
                albumId: albumID,
                artistId: albumData.artist.id,
                albumCoverImageURL: albumData.albumCoverImageURL,
                albumName: albumData.name,
                artistName: albumData.artist.name,
                albumReleaseYear: albumData.albumReleaseYear,
                ratingOutOfTen: (rating * 2)
            }
            console.log(ratingDTO);
            fetchPost(ratingDTO, "/user/rate/").then(r => {});
        }
    }

    return(
        <div>
            {albumData === null ? null : getAlbumPage() }
        </div>
    )
    function getAlbumPage(){
        return(
            <div className={"wrapper album-page"}>
                <div className={"column"}>
                    <img className={"album-image"} src={albumData.albumCoverImageURL} alt={"album cover"}/>
                </div>
                <div className={"album-info-column"}>
                    <div className={"album-title"}>
                        {albumData.name}
                    </div>
                    <table>
                        <tr>
                            <th>Artist</th>
                            <td>
                                <span>
                                    <a className={"nostyle"} href={"/artist/" + albumData.artist.id}  >
                                      <span className={"artist-name"}>
                                          {albumData.artist.name}
                                      </span>
                                    </a>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <td>{albumData.types}</td>
                        </tr>
                        <tr>
                            <th>Released</th>
                            <td>{albumData.releaseDate}</td>
                        </tr>
                        <tr>
                            <th>RYM Rating</th>
                            <td>
                                <span>
                                    <span className={"average-rating"}> {albumData.averageRating / 2} </span>
                                    <span className={"darkgrey-text"}> / 5,0 from</span>
                                    <span> {albumData.amountOfRatings} </span>
                                    <span className={"darkgrey-text"}> ratings </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th>Genres</th>
                            <td>
                                <div>
                                    {albumData.genres}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Descriptors</th>
                            <td className={"darkgrey-text"}>{albumData.descriptors}</td>
                        </tr>
                        <tr>
                            <th>Language</th>
                            <td>{albumData.languages}</td>
                        </tr>
                        <tr>
                            <th>Your rating </th>
                            <td>
                                <select name="ratings" value={initialRating} onChange={handleChange} id="rating">
                                    <option value="no rating">No rating</option>
                                    <option value="0.5">0.5 stars</option>
                                    <option value="1.0">1.0 stars</option>
                                    <option value="1.5">1.5 stars</option>
                                    <option value="2.0">2.0 stars</option>
                                    <option value="2.5">2.5 stars</option>
                                    <option value="3.0">3.0 stars</option>
                                    <option value="3.5">3.5 stars</option>
                                    <option value="4.0">4.0 stars</option>
                                    <option value="4.5">4.5 stars</option>
                                    <option value="5.0">5.0 stars</option>
                                </select>
                                <button className={"rate-button"} onClick={() => Rate()}> Rate </button>
                            </td>
                            <td>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }

}

export default AlbumPage;


