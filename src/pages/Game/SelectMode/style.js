import styled from "styled-components";

const Title = styled.h1`
  line-height: 34px;
  font-size: 35px;

  margin: 50px 0;
`;

const Menu = styled.div`
  display: flex;
  max-width: 700px;

  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const ModeBox = styled.button`
  all: unset;
  width: 300px;
  height: 120px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding: 25px;
  border-radius: 12px;
  box-shadow: 0px 0px 2px 0px #000;

  background-color: ${(props) => props.bgColor};
  transition: all 0.3s ease;
  cursor: pointer;

  color: #fff;
  font-family: "Manrope", sans-serif;
  font-weight: 500;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.08);
  }
`;

const ModeName = styled.h2`
  margin-bottom: 8px;
  line-height: 24px;
  font-size: 24px;
`;

const ModeDescription = styled.p`
  color: #eee;
  line-height: 16px;
  font-size: 16px;
`;

export { Menu, Title, ModeBox, ModeDescription, ModeName };
