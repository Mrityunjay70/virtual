import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import Compass from "../Components/Atoms/Compass";
import IconButton from "../Components/Atoms/IconButton";
import { FullScreenIcon, HideIcon, RadiusIcon } from "../Icons";
import {
  getCombinedTowerName,
  toggleFullScreen,
  toogleHideOverlays,
} from "../Utility/function";
import { useInventories, useMapFilter } from "../Hooks";
import {
  getFloorType,
  screen1PageMapFilters,
  TOWERS,
  TOWERS_LIST,
  unitTypeFilters,
} from "../Data";
import CollapsiblePanel from "../Components/Molecules/CollapsiblePanel";
// import Screen1PageMapFilter from "../Components/Molecules/Screen1PageMapFilter";
// import Legends from "../Components/Atoms/Legends";
import UnitTypeFilter from "../Molecules/UnitTypeFilter";
// import { TowerSvg } from "../Data/TowerSvg";
// import FloorNoIndicator from "../Components/Molecules/FloorNoIndicator";
// import SVG from "../Components/Atoms/SVG";
import FloorSvg from "../Components/SVGs/FloorSvg";
// import UnitMark from "../Components/Atoms/UnitMark";
import Zoomable from "../Components/Molecules/Zoomable";
import FloorSelector from "../Components/Molecules/FloorSelector";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Navigator from "../Molecules/Navigator";
import { useNavigate, useLocation } from "react-router-dom";
// import ApartmentsDetails from "../Components/Molecules/ApartmentsDetails";
import { useContext } from "react";
import { AppContext, useLoading } from "../../Contexts/AppContext";
// import ReturnToPrev from "../Components/Atoms/ReturnToPrev";
// import { FLOORS_IMGS } from "../Data/flatSvgs";
// import ProjectVideoBtn from "../Components/Molecules/ProjectVideoBtn";
import {
  COMPASS_ANGLES,
  getCombinedTowerFromTower,
} from "../Utility/Constants";
import UnitStatusLegend from "../Components/Atoms/UnitStatusLegend";
import Loading from "../Components/Atoms/Loading";
// import ReraNumber from "../Components/Molecules/ReraNumber";

function Floor() {
  const towers = {
    a: "A",
    b: "B",
    c: "C",
    d: "D",
    e: "E",
    f: "F",
    g: "G",
    h: "H",
  };

  const { activeMapFilterIds, isFilterActive, setActiveMapFilterIds } =
    useMapFilter();
  const { getAllFlatsInFloor } = useInventories();
  const [showOverlays, setShowOverlays] = useState(true);
  const ref = useRef();
  const params = useParams();
  const { floor, tower, unit } = params;
  const combinedTower = getCombinedTowerFromTower(tower);
  const UNITS = getAllFlatsInFloor(tower, floor);

  const currentFloor = parseInt(floor);
  const currentTower = tower;
  const [selectedFloor, setSelectedFloor] = useState(currentFloor);
  const [selectedTower, setSelectedTower] = useState(currentTower);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [exploreView, setExploreView] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    flatFilterPriceValues,
    flatFilterSizeValues,
    setFlatFilterSizeValues,
  } = useContext(AppContext);
  const { getMinMaxSBUInTower, getAllUnitTypesInFloor } = useInventories();

  useEffect(() => {
    if (params.unit) {
      setSelectedUnit(parseInt(unit.slice(2)));
      setExploreView(true);
      // setMapValue(mapValuesOfUnits[parseInt(unit.slice(2))]);
    } else {
      setSelectedUnit(null);
      setExploreView(false);
    }
  }, [location]);

  useEffect(() => {
    // adding animation in zoomable compoenent
    ref.current.parentElement.style.transition = "all linear 0.1s";
    toogleHideOverlays(showOverlays);
  }, [showOverlays]);

  const minMaxArea = [
    Math.min(...getMinMaxSBUInTower(tower)),
    Math.max(...getMinMaxSBUInTower(tower)),
  ];

  useEffect(() => {
    setLoading(true);
    setFlatFilterSizeValues(minMaxArea);
    setActiveMapFilterIds([...unitTypeFilters.map((filter) => filter.id)]);
  }, [tower, floor]);

  const isUnitActive = (unit) => {
    if (!unit) return false;
    if (
      !activeMapFilterIds.includes(
        unit.unit_type
      )
    )
      return false;
    const flatSBU = unit.area;
    if (
      !(
        flatSBU <= flatFilterSizeValues[1] && flatSBU >= flatFilterSizeValues[0]
      )
    )
      return false;
    return true;
  };

  const unitTypeFilters = getAllUnitTypesInFloor(tower, floor).map((type) => ({
    title: type,
    id: type,
  }));

  useEffect(() => {
    if (["T1", "T2", "T3", "T4"].includes(tower) && parseInt(floor) === 42) {
      navigate(`/SVN/tower/${tower}/floor/41`);
    }
  }, [floor, tower]);
  return (
    <Style
      onClick={() => {
        setSelectedFloor(currentFloor);
        setSelectedTower(currentTower);
        setSelectedUnit(false);
        setExploreView(false);
      }}
      id="floor-container"
    >
      {loading && <Loading />}
      {/* <ProjectVideoBtn /> */}

      <ReturnToPrev
        text="Return To Tower"
        to={`/SVN/tower/${combinedTower}`}
      />

      <Navigator
        className="navigator"
        prevPages={[
          // { title: "Delhi", path: "" },
          // {
          //   title: "Dwarka Expressway",
          //   path: "",
          // },
          {
            title: "SVN",
            path: "/SVN",
          },
          {
            title: `${tower}`,
            path: `/SVN/tower/${combinedTower}`,
          },
        ]}
        currentPage={{
          title: `${floor == 0 ? `Ground Floor` : `Floor ${floor}`}`,
          path: `/SVN/tower/${tower}/floor/${floor}`,
        }}
      />
      <>
        <div className="floor-selector overlay-can-fade-out">
          <FloorSelector
            currentFloor={currentFloor}
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
            currentTower={currentTower}
            selectedTower={selectedTower}
            setSelectedTower={setSelectedTower}
          />
        </div>

        <div className="unit-type-filter overlay-can-fade-out">
          <CollapsiblePanel title={"Filters"}>
            <UnitTypeFilter
              unitTypeFilters={unitTypeFilters}
              minMaxArea={minMaxArea}
              totalUnits={getAllFlatsInFloor(tower, floor).length}
            />
          </CollapsiblePanel>
        </div>
      </>
      <div className="right-btn-group absolute right top">
        <IconButton
          className="icon-btn"
          icon={HideIcon}
          tooltip="Hide Overlays"
          activeTooltip="Show Overlay"
          onClick={() => setShowOverlays((old) => !old)}
        />
      </div>
      <UnitStatusLegend />

      <div className="compass-fullscreen-wrapper absolute bottom right flex row overlay-can-fade-out">
        <div className="col flex j-end">
          {/* <Compass
            angle={COMPASS_ANGLES.floors[tower][getFloorType(tower, floor)]}
          /> */}
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
      {/* <ApartmentsDetails /> */}
      <Zoomable>
        <div className="zoomable-container" ref={ref}>
          <div className="img-wrapper">
            <img
              src={`${process.env.PUBLIC_URL}/floor/${ currentTower.toLowerCase()
              }/${getFloorType(tower, floor)}.png`}
              alt="floor"
              onLoad={() => setLoading(false)}
            />
          </div>
          {UNITS.length > 0 && (
            <div className="svg-wrapper">
              <FloorSvg
                isActive={isUnitActive}
                tower={tower}
                floor={floor}
                units={UNITS}
              />
            </div>
          )}
        </div>
      </Zoomable>
      
    </Style>
  );
}

// const SVG = ({ Renderer }) => Renderer;
export default Floor;

const Style = styled.main`
  height: 100vh;
  width: 100%;
  /* background-image: url(${process.env.PUBLIC_URL}/dubai_map.jpg); */
  background-position: center;

  .unit-type-filter {
    position: absolute;
    top: 0;
    left: 0rem;
  }

  .floor-selector {
    position: absolute;
    left: 14rem;
    top: 8rem;
  }

  .zoomable-container {
    cursor: default;
    width: 100vw;
    height: 100vh;
    transform-origin: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 12rem;

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  .img-wrapper {
    background: rgb(48, 41, 32);
    background: linear-gradient(
      68deg,
      rgba(48, 41, 32, 1) 0%,
      rgba(124, 111, 91, 1) 15%,
      rgba(138, 124, 102, 1) 25%,
      rgba(134, 121, 99, 1) 32%,
      rgba(121, 109, 90, 1) 45%,
      rgba(92, 86, 74, 1) 100%
    );
  }

  .img-wrapper,
  .svg-wrapper {
    padding: 20px;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
  }

  .svg-wrapper {
    z-index: 0;
  }

  .zoom-control {
    position: absolute;
    right: 0px;
    bottom: 45%;
    z-index: 8;
    margin-top: 0px !important;
    display: flex;
    flex-direction: column;
    margin: 2rem;
  }

  .zoom-btn {
    width: 36px;
    height: 36px;
    background: var(--button_background_zoom);
    border-radius: 8px;
    display: inline-block;
    border: none;
    box-shadow: var(--button_shadow);
    border-radius: var(--radius);
    font-size: 22px;
    display: grid;
    place-items: center;
    text-align: center;
    pointer-events: auto;
    line-height: 19px;
    cursor: pointer;
    color: #a09c9c;
    transition: var(--transition);

    :hover {
      background: var(--button_background_zoom_hover);
    }
  }

  .zoom-btn-disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .plus-btn {
    margin-bottom: 10px;
  }

  .navigator {
    position: absolute;
    top: 0rem;
    left: 0rem;
    margin: 2rem;
  }

  .left-interface {
    position: absolute;
    top: 0;
    left: 0;
    padding: 2rem;
  }

  .right-btn-group {
    margin: 1rem;
    z-index: 2;
    .icon-btn {
      margin: 1rem;
    }
  }

  .compass-fullscreen-wrapper {
    padding: 1rem;
    padding-right: 2rem;
  }
`;
