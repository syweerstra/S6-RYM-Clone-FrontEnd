import React, {useEffect, useState} from "react";
import "../style/artist.css";
import {fetchGet, fetchGetWithBody} from "../services";
import {useParams} from "react-router-dom";


function ArtistPage(props){
    const artistID = useParams().id;
    const[artistData, setArtistData] = useState(null);
    useEffect(() =>
    {
        fetchGet(artistID, '/artist/').then(data => {
            console.log(data);
            setArtistData(data);
        })
    }, []);

    return(
        <div>
            {artistData === null ? null : artistPageData() }
        </div>
    )

    function artistPageData(){
        return (
            <div className={"wrapper artist-page"}>
                <div className={"column"}>
                    <img className={"album-image"} src={artistData.artistImageURL} alt={"album cover"}/>
                </div>
                <div className={"album-info-column"}>
                    <div className={"artist-info"}>
                        <div className={"artist-name"}> {artistData.name} </div>

                        <div>
                            <div className={"info-header"}> Born </div>
                            <div className={"info-content"}> {artistData.bornIn} </div>
                            <div className={"info-header"}> Currently </div>
                            <div className={"info-content"}> {artistData.currentlyIn} </div>
                            <div className={"info-header"}> Member of </div>
                            <div className={"info-content"}> Super Chron Flight Brothers, The Reavers, Armand Hammer </div>
                            <div className={"info-header"}> Genres </div>
                            <div className={"info-content"}> Abstract Hip Hop, East Coast Hip Hop, Experimental Hip Hop, Hardcore Hip Hop, Conscious Hip Hop, Jazz Rap </div>
                        </div>
                        <div>
                            <div style={{fontSize: 22}}> Discography</div>
                            <div className={"disco-header"}> Albums </div>
                            <table id={"albums"}>
                                <tr >
                                    <th> </th>
                                    <th className={"info-table-header"}> Title / Release Date </th>
                                    <th className={"info-table-header"}> Reviews </th>
                                    <th className={"info-table-header"}>  Ratings </th>
                                    <th className={"info-table-header"}> Average </th>
                                </tr>
                                {artistData.albums.map(album => (
                                    <tr className={"info-table-content"}>
                                        <th> <img className={"image-release"} src={album.albumCoverImageURL}/> </th>
                                        <th className={"title-release-date"}>
                                            <a className={"nostyle"} href={"/album/" + album.id}>
                                                <div className={"title"}> {album.name} </div>
                                            </a>
                                            <div className={"release-date"}> {album.releaseYear} </div>
                                        </th>
                                        <th> {album.amountOfReviews} </th>
                                        <th> {album.amountOfRatings} </th>
                                        <th className={"average-rating"}> {album.averageRating / 2} </th>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ArtistPage;
