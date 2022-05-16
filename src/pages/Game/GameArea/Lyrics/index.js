import styled from "styled-components";

export default function Lyrics({children, text}) {

  return <Lyric> {children || text.lineContent.join(" ")} </Lyric>
}

const Lyric = styled.li`
  width: 100%;
  height: 40px;

  display: flex; 
  align-items: center;
  justify-content: center;

  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;
`;