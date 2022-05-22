import styled from "styled-components";

const Message = styled.div`
  width: 500px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 25px;
  line-height: 25px;
  font-weight: 500;

  background-color: #224740;
  border-radius: 10px;

  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  cursor: pointer;
`;

const FocusWarning = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;

  display: ${(props) => (props.show ? "block" : "none")};

  background-color: rgba(0,0,0,0.8);
`;

const LyricsBox = styled.ul`
  width: 100%;
  height: 80px;

  margin-top: 40px;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1000px;

  position: relative;
  margin-top: 30px;
`;

export { Message, Container, FocusWarning, LyricsBox };