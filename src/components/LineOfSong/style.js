import styled from "styled-components";

const Cursor = styled.i`
  all: unset;
  box-sizing: border-box;

  background-color: #8b12e8;
  width: 10px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #fff;
`;

const Lyric = styled.li`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;

  b {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }
`;


export { Cursor, Lyric, Circle };
