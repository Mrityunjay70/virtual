import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Compass from "../Components/Atoms/Compass";
import IconButton from "../Components/Atoms/IconButton";
import { FullScreenIcon, HideIcon, RadiusIcon } from "../Icons";
import { toggleFullScreen, toogleHideOverlays } from "../Utility/function";
import {
  mark_radius,
  screen1_landmarks_with_routes,
  smart_world_site_1,
} from "../Data/Screen1PageSvg";
import SVG from "../Components/Atoms/SVG";
import { useMapFilter } from "../Hooks";
import LocationInfo from "../Components/Atoms/LocationInfo";
import { Link } from "react-router-dom";
import { screen1PageMapFilters } from "../Data";
import CollapsiblePanel from "../Components/Molecules/CollapsiblePanel";
import Screen1PageMapFilter from "../Components/Molecules/Screen1PageMapFilter";
import Legends from "../Components/Atoms/Legends";
import UnitTypeFilter from "../Components/Molecules/UnitTypeFilter";
import Navigator from "../Components/Molecules/Navigator";
import TowersSvg from "../Components/Atoms/TowersSvg";
import ProjectVideoBtn from "../Components/Molecules/ProjectVideoBtn";
import { COMPASS_ANGLES } from "../Utility/Constants";
import VrTourBtn from "../Components/Molecules/VrTourBtn";
import ReraNumber from "../Components/Molecules/ReraNumber";

function HomePage(props) {
  const [imageNumber, setImageNumber] = useState(0);
  const totalImages = [0, 1, 2, 3];
  const handlePrevImage = () => {
    setImageNumber((prev) => (prev > totalImages.length - 2 ? 0 : prev + 1));
  };
  const handleNextImage = () => {
    setImageNumber((prev) => (prev < 1 ? totalImages.length - 1 : prev - 1));
  };
  return (
    <Style id="m3m-crown-page">
      <Navigator
        className="navigator"
        // prevPages={[
        //   { title: "India", path: "/india" },
        //   { title: "Delhi", path: "" },
        //   {
        //     title: "Dwarka Expressway",
        //     path: "",
        //   },
        // ]}
        currentPage={{
          title: "SVN",
          path: "/SVN",
        }}
      />
       <ProjectVideoBtn /> 
       <VrTourBtn /> 
      <div className="compass-fullscreen-wrapper absolute bottom right flex row">
        <div className="col flex j-end">
          <Compass angle={COMPASS_ANGLES.PROJECT_PAGE[imageNumber]} />
        </div>
        <div className="col w-space flex j-end">
          <IconButton
            icon={FullScreenIcon}
            tooltip="Fullscreen"
            activeTooltip="Close Fullscreen"
            onClick={() => toggleFullScreen()}
          />
        </div>
      </div>
      <div className="overlay-can-fade-out">
       
      </div>
      <svg
        preserveAspectRatio="xMidYMid slice"
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        fill="none"
      >
        <g>
          {totalImages.map((val, index) => (
            <image
              height="100%"
              hidden={val !== imageNumber}
              style={{ objectFit: "contain", backdropFilter: "opacity(10%)" }}
              xlinkHref={`${process.env.PUBLIC_URL}/homepage/${0}.png`}
            />
          ))}
        </g>
        {/* svg for all towers with tippy */}
        <TowersSvg imageNumber={imageNumber} />
      </svg>
  
      {/* <ProjectVideoBtn /> */}
    </Style>
  );
}

// const SVG = ({ Renderer }) => Renderer;
export default HomePage;

const Style = styled.main`
  height: 100vh;
  overflow: hidden;
  width: 100%;
  background-color: #050a06;

  svg {
    height: 100%;
    width: 100%;
    /* background: red; */
  }

  .navigator {
    position: absolute;
    top: 0rem;
    left: 0rem;
    margin: 2rem;
  }

  .right-btn-group {
    margin: 1rem;
    .icon-btn {
      margin: 1rem;
    }
  }
  .arrow-left {
    transform: rotate(90deg);
  }
  .arrow-right {
    transform: rotate(-90deg);
  }
  .arrow-animate {
    animation: arrow 0.9s 0.3s infinite alternate ease-in-out;

    @keyframes arrow {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.2);
      }
    }
  }
  .compass-fullscreen-wrapper {
    padding: 1rem;
    padding-right: 2rem;
  }
`;
