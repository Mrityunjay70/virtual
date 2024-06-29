import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Compass from "../Components/Atoms/Compass";
import IconButton from "../Components/Atoms/IconButton";
import { FullScreenIcon, HideIcon, RadiusIcon } from "../Icons";
import { toggleFullScreen, toogleHideOverlays } from "../Utility/function";
import { useInventories, useMapFilter } from "../Hooks";
import { screen1PageMapFilters, TOWERS } from "../Data";
import CollapsiblePanel from "../Components/Molecules/CollapsiblePanel";
import UnitTypeFilter from "../Components/Molecules/UnitTypeFilter";
import { TowerSvg } from "../Data/TowerSvg";
import Navigator from "../Components/Molecules/Navigator";
import { useParams } from "react-router-dom";
import Amenities from "../Components/Atoms/Amenities";
import TowerName from "../Components/Atoms/TowerName";
import ExploreTowers from "../Components/Molecules/ExploreTowers";
import TowerRotateInstruction from "../Components/Atoms/TowerRotateInstruction";
import ProjectVideoBtn from "../Components/Molecules/ProjectVideoBtn";
import PopupVideoPlayer from "../Components/Molecules/PopupVideoPlayer";
import UnitStatusLegend from "../Components/Atoms/UnitStatusLegend";
import FloorSelector from "../Components/Molecules/FloorSelector";
import ReturnToPrev from "../Components/Atoms/ReturnToPrev";
import { AppContext } from "../Contexts/AppContext";
import ReraNumber from "../Components/Molecules/ReraNumber";

function Tower(props) {
  const { tower } = useParams();
  const [showOverlays, setShowOverlays] = useState(true);
  const { setActiveMapFilterIds } = useMapFilter();

  const { setFlatFilterSizeValues } = useContext(AppContext);

  const {
    getAllUnitTypesInCombinedTowers,
    getAllUnitsInCombinedTowers,
    getMinMaxSBUInCombinedTowers,
  } = useInventories();

  useEffect(() => {
    toogleHideOverlays(showOverlays);
  }, [showOverlays]);

  const minMaxArea = getMinMaxSBUInCombinedTowers(tower);

  useEffect(() => {
    setFlatFilterSizeValues(minMaxArea);
    setActiveMapFilterIds([...unitTypeFilters.map((filter) => filter.id)]);
  }, [tower]);

  const unitTypeFilters = getAllUnitTypesInCombinedTowers(tower).map(
    (type) => ({
      title: type,
      id: type,
    })
  );

  return (
    <Style>
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
        ]}
        currentPage={{
          title: `${tower.toUpperCase()}`,
          path: "tower",
        }}
      />
      <ExploreTowers currentTower={tower} />
      <ReturnToPrev text="Return To Aerial View" to={`/SVN`} />

      <UnitStatusLegend />
      <div className="left-panels">
        <CollapsiblePanel className="filters" title={"Filters"}>
          <UnitTypeFilter
            minMaxArea={minMaxArea}
            unitTypeFilters={unitTypeFilters}
            totalUnits={getAllUnitsInCombinedTowers(tower).length}
          />
        </CollapsiblePanel>
        {/* <ExploreTowers currentTower={tower} /> */}
        {/* <FloorSelector /> */}
      </div>
      <div className="right-btn-group absolute right top">
        <IconButton
          className="icon-btn"
          icon={HideIcon}
          tooltip="Hide Overlays"
          activeTooltip="Show Overlay"
          onClick={() => setShowOverlays((old) => !old)}
        />
      </div>
      {/* <TowerRotateInstruction /> */}
      {/* <ProjectVideoBtn /> */}

      <div className="compass-fullscreen-wrapper absolute bottom right flex row overlay-can-fade-out">
        <div>{/* <Amenities /> */}</div>

        <div className="col w-space flex j-end overlay-can-fade-out">
          <IconButton
            icon={FullScreenIcon}
            tooltip="Fullscreen"
            activeTooltip="Close Fullscreen"
            onClick={() => toggleFullScreen()}
          />
        </div>
      </div>

      <div className="svg-wrapper" id="tower-page-svg-wrapper">
        {/* change this when you get complete data */}
        {tower && <TowerSvg tower={tower} />}
      </div>
      
    </Style>
  );
}

// const SVG = ({ Renderer }) => Renderer;
export default Tower;

const Style = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden !important;
  /* background-image: url(${process.env.PUBLIC_URL}/dubai_map.jpg); */
  background-position: center;
  background-color: #87cfeb98;
  /* 
  #return-to-tower {
    position: relative;
    left: 0;
    transform: unset;
    top: 0vh;
    background-color: rgba(41, 57, 160, 0.8);
  } */

  .svg-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    height: 100vh;
    width: 100%;
    overflow: hidden !important;
    display: flex;
    align-items: flex-end;
  }

  .svg-wrapper {
    z-index: 0;
  }

  .navigator {
    position: absolute;
    top: 0rem;
    left: 0rem;
    margin: 2rem;
  }

  .map-filters,
  .location-info {
    position: absolute;
    top: 0;
    left: 2rem;
    margin-top: 8rem;
  }

  .location-info {
    margin-left: 12rem;
  }

  .left-panels {
    position: absolute;
    top: 1vh;
    left: 2rem;
    display: flex;
    flex-direction: column;
    z-index: 10;
    justify-content: space-between;
    height: 75vh;
    gap: 2rem;

    .filters {
      position: relative !important;
      left: 0;
      top: 0;
    }
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
    align-items: center;
    padding-right: 2rem;
  }
`;
