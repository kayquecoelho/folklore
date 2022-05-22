import styled from "styled-components";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import Song from "./Song";

export default function Home() {
  const [songs, setSongs] = useState(null);
  const { songService } = useApi();
  const fakeSongs = [1, 2, 3, 4];

  useEffect(() => {
    fetchSongs();
  }, []);

  async function fetchSongs() {
    try {
      const response = await songService.getAllSongs();
      setSongs(response.data);
    } catch (error) {
      console.log(error.response);
      alert("something went Wrong!");
    }
  }

  if (!songs) {
    return (
      <Container>
        <TitleOfSection>Top Lyrics</TitleOfSection>
        <Catalogue>
          {fakeSongs.map(song => <Song key={song} />)}
        </Catalogue>
      </Container>
    );
  }

  return (
    <Container>
      <TitleOfSection>Top Lyrics</TitleOfSection>
      <Catalogue>
        {songs.length === 0 && "There are no songs available!"}
        {songs.map((song) => (
          <Song key={song.id} {...song} />
        ))}
      </Catalogue>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  max-width: 1100px;

  margin: 0 auto;
  margin-top: 90px;

  font-family: "Inter", sans-serif;
  color: #efeeec;
`;

const TitleOfSection = styled.h1`
  font-size: 30px;
  line-height: 30px;
  font-weight: 500;

  margin-bottom: 30px;
`;

const Catalogue = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;
