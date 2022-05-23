import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import SelectMode from "./SelectMode";
import useApi from "../../hooks/useApi";
import useSongContext from "../../hooks/useSongContext";
import GameArea from "./GameArea";

export default function Game() {
  const { songId } = useParams();
  const [songData, setSongData] = useState();
  const { songService } = useApi();
  const { encryptedSongData } = useSongContext();

  useEffect(() => {
    fetchSongData();
  }, []);

  async function fetchSongData() {
    try {
      const response = await songService.getSongById(songId);
      setSongData(response.data);
    } catch (error) {
      console.log(error.response);
      alert(error.response.data);
    }
  }

  if (!songData) {
    return (
      <Container centralize={true}>
        <Audio height="100" width="100" color="#4dadb5" ariaLabel="loading" />
        <p> Loading song data...</p>
      </Container>
    );
  }

  return (
    <Container>
      {encryptedSongData 
        ? <GameArea />
        : <SelectMode songData={songData} />
      }
      
    </Container>
  );
}

const Container = styled.main`
  width: 100%;
  height: 550px;

  margin-top: 70px;
  padding: 0 25px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  ${(props) =>
    props.centralize &&
    `
    justify-content: center;
    gap: 8px;
    font-size: 20px;
  `}

  color: #fff;
  font-family: "Manrope", sans-serif;
  font-weight: 500;
`;
