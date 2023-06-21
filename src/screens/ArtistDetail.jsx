import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArtist } from "../services/artists.js";
import AlbumCover from "../components/AlbumCover.jsx";
import "../App.css";


function ArtistDetail({id}) {
  const [artist, setArtist] = useState({});
  const [artistName, setArtistName] = useState("");


  const { artistID } = useParams();
  console.log(id)

  useEffect(() => {
    const fetchArtist = async () => {
      const response = await getArtist(artistID);
      setArtist(response);
      const res = await getArtist(artistName);
      setArtistName(res);
    };
    fetchArtist();
  }, []);

  if (!artist.name) return <h1>Loading...</h1>;


  return (
    <div>
      <h1 className="artist-name">{artist.name}</h1>
      {artist.genre.map((genre) => (
        <p className="genre-list" key={genre}>
          {genre}
        </p>
      ))}
      <div>
        <img src={artist.artistImg} className="gallery-pic" />
      </div>

      <div className="album-cover-artist">
        {artist.albums.map((album) => (
          <AlbumCover key={album._id} album_id={album._id} />
        ))}
      </div>

      <div className="gallery">
        <p className="center bio">{artist.bio}</p>
      </div>

      <Link to={`/artists/${artist._id}/add-album`}>
        <button className="crudButton">Add Album</button>
      </Link>

      <Link to="/artists">
        <h2>Back to ARTISTS</h2>
      </Link>
    </div>
  );
}

export default ArtistDetail;
