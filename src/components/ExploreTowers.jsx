import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  COMMBINED_TOWERS_LIST,
  TOWERS_LIST,
  getTowerNumberFromName,
} from "../../Data";
import {
  COMBINED_TOWERS_MAP,
  getCombinedTowerFromTower,
} from "../../Utility/Constants";

function ExploreTowers({ currentTower }) {
  return (
    <Style className="overlay-can-fade-out">
      <div className="title">Explore Towers</div>
      <div className="towers two">
        {COMMBINED_TOWERS_LIST.slice(0, 1).map((tower) =>
          COMBINED_TOWERS_MAP[tower].map((tower) => (
            <Link
              to={`/SVN/tower/${getCombinedTowerFromTower(tower)}`}
              className="no-dec towerlink"
            >
              <div
                className={
                  COMBINED_TOWERS_MAP[currentTower].includes(tower)
                    ? "tower active"
                    : "tower"
                }
                key={tower}
              >
                {/* {getTowerNumberFromName(tower)} */}
                {tower}
              </div>
            </Link>
          ))
        )}
      </div>
      <div className="towers three">
        {COMMBINED_TOWERS_LIST.slice(1).map((tower) =>
          COMBINED_TOWERS_MAP[tower].map((tower) => (
            <Link
              to={`/SVN/tower/${getCombinedTowerFromTower(tower)}`}
              className="no-dec towerlink"
            >
              <div
                className={
                  COMBINED_TOWERS_MAP[currentTower].includes(tower)
                    ? "tower active"
                    : "tower"
                }
                key={tower}
              >
                {/* {getTowerNumberFromName(tower)} */}
                {tower}
              </div>
            </Link>
          ))
        )}
      </div>
    </Style>
  );
}

const Style = styled.div`
  color: var(--color_text);
  background: var(--panel_background);
  position: absolute;
  right: 2rem;
  top: 35vh;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  width: fit-content;
  padding: 1rem;
  z-index: 5;
  .no-dec {
    text-decoration: none;
  }
  .title {
    color: var(--color_text);
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    padding: 10px 0;
    opacity: 0.9;
  }
  .towers {
    display: grid;
    grid-template-columns: 1fr 1fr;

    width: fit-content;
    margin: 0;
    margin-top: 0.7rem;
    flex-wrap: wrap;
    &.three {
      grid-template-columns: 1fr 1fr;
      margin-top: 0;
      margin: auto;
    }
    .tower {
      background-color: var(--background_panel);
      color: var(--color_text);
      border: 1px solid #3e3e3e;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      border-radius: 4px;
      text-align: center;
      margin: 0 2px;
      margin-bottom: 10px;
      cursor: pointer;
      padding: 0.3rem 0.7rem;
      font-size: 12px;
      :hover {
        background-color: var(--background_panel_hover);
      }
    }
    .tower.active {
      background-color: var(--blue-theme);
      border-color: var(--blue-theme);
    }
  }
`;

export default ExploreTowers;
