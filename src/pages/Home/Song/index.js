import styled from "styled-components";
import { GiMicrophone } from "react-icons/gi";
import { MdRemoveRedEye } from "react-icons/md";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Song({
  createdAt,
  artist,
  viewsCount,
  name,
  cover,
  id,
}) {
  const date = createdAt && dayjs(createdAt).format("YYYY");

  return (
    <StyledLink to={id ? `/play/${id}` : ""}>
      <BoxSong>
        <SongCover>
          {!cover && <StyledSkeleton height="100%" width="100%" />}
          <img
            src={cover}
            alt={name}
            style={{ display: !cover ? "none" : undefined }}
          />
        </SongCover>
        <SongInfo>
          <p className="date">
            {date || <StyledSkeleton height="100%" width="35px" />}
          </p>
          <Circle />
          <p className="artist">
            <GiMicrophone />{" "}
            <span>
              {artist?.name || <StyledSkeleton height="100%" width="80px" />}
            </span>
          </p>
          <Circle />
          <p className="views-count">
            <MdRemoveRedEye />{" "}
            <span>
              {viewsCount === undefined && <StyledSkeleton height="100%" width="76px" />}
              {viewsCount}
              {viewsCount !== undefined && " views"}
            </span>
          </p>
        </SongInfo>
        <SongName>
          {name || <StyledSkeleton height="100%" width="100%" />}
        </SongName>
      </BoxSong>
    </StyledLink>
  );
}

function StyledSkeleton({ height, width }) {
  return (
    <Skeleton
      baseColor="rgba(0,0,0,0.5)"
      highlightColor="rgba(0,2,2,1)"
      height={height}
      width={width}
    />
  );
}

const StyledLink = styled(Link)`
  all: unset;
`;

const Circle = styled.div`
  width: 3px;
  height: 3px;

  border-radius: 50%;
  background-color: #fff;
`;

const SongCover = styled.div`
  width: 100%;
  height: 150px;
  margin-bottom: 10px;

  overflow: hidden;
  border-radius: 5px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const BoxSong = styled.ul`
  width: 250px;
  height: 200px;

  cursor: pointer;
  border-radius: 5px;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const SongInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #eaeef3;

  margin-bottom: 7px;

  .artist,
  .views-count {
    display: flex;
    align-items: center;
    gap: 3px;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .artist {
    max-width: 100px;
    span {
      max-width: 80px;
    }
  }

  .views-count {
    max-width: 93px;
    span {
      max-width: 76px;
    }
  }
`;

const SongName = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
`;
