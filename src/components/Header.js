import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        folklore
      </Title>
    </Container>
  );
}

const Container = styled.header`
  width: 100%;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  background-color: #161d2f;
  box-shadow: 0px 0px 19px 0px rgb(0 0 0);
  border-radius: 3px;
`;

const Title = styled.h1`
  color: #e5df49;
  font-family: "Lobster", cursive;
  font-weight: 400;
  font-size: 36px;

  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    color: #ddda28;
  }
`;
