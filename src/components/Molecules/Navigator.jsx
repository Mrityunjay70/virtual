import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useLandmark } from "../../Hooks";
import { Link, useNavigate } from "react-router-dom";

function Navigator({
  className,
  currentPage,
  prevPages = [],
  nextPages = [],
  landmarks_with_routes,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { selectedLandmarkId } = useLandmark();

  const navigate = useNavigate();

  return (
    <Style className={className}>
      <Logo />
      <BackButton
        onClick={(e) => {
          if (prevPages.length > 0) {
            e.stopPropagation();
            navigate(prevPages[prevPages.length - 1].path);
          }
        }}
      />
      <div class="path">
        <div class="path__scroll">
          {/* prev pages */}
          {prevPages.map((page, index) => (
            <Path
              collapsed={isCollapsed}
              isActive={false}
              title={page.title}
              isFirst={index == 0}
              onClick={(e) => navigate(page.path)}
            />
          ))}

          {/* current page */}
          {currentPage && (
            <Path
              collapsed={isCollapsed}
              isActive={true}
              title={currentPage.title}
              isFirst={prevPages.length == 0}
            />
          )}
          {/* next pages */}
          {nextPages.map((page) => (
            <Path
              collapsed={isCollapsed}
              isActive={false}
              title={page.title}
              isFirst={false}
              onClick={() => navigate(page.path)}
            />
          ))}

          {selectedLandmarkId &&
            landmarks_with_routes?.[selectedLandmarkId]?.routeDetails && (
              <RouteDetails
                landMarkRouteDetails={
                  landmarks_with_routes?.[selectedLandmarkId]?.routeDetails
                }
              />
            )}
        </div>
      </div>
      {}
      <CollapseButton
        isCollapsed={isCollapsed}
        onClick={() => setIsCollapsed((collapsed) => !collapsed)}
      />
    </Style>
  );
}

export default Navigator;

const Style = styled.header`
  position: absolute;
  top: 0rem;
  left: 0rem;
  background-color: var(--background_panel);
  display: flex;
  height: 60px;
  max-width: 100%;
  width: fit-content;
  background-color: var(--background_panel);
  border-radius: var(--radius);
  z-index: 13;
  pointer-events: all;
  align-items: center;
  overflow: hidden;
  transition: all 800ms linear !important;
  button {
    border: 0;
    border-radius: 0;
    padding: 5px 10px;
    background-color: #006fff;
    color: #fff;
    flex-shrink: 0;
    cursor: pointer;
    margin: 0;
  }
  .logo {
    opacity: 0.8;
    margin-left: 20px;
    margin-right: 1.2rem;
    object-fit: content;
    svg {
      width: 170px;
      height: auto;
      display: grid;
      place-items: center;
    }
  }
  .back {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    opacity: var(--header_up_opacity);
    transition: opacity var(--transition);
    cursor: pointer;
    color: #fff;
    svg {
      width: 17px;
      height: 17px;
      fill: var(--header_up_icon_color);
      opacity: 0.5;
    }
    .back__text {
      margin-top: 2px;
      font-size: 9px;
      text-transform: uppercase;
      text-align: center;
      color: var(--header_up_text_color);
    }
  }
  .path {
    position: relative;
    width: 100%;
    height: 100%;
    touch-action: pan-x;
    overflow: hidden;
  }
  .active {
    svg {
      transform: rotate(0deg) !important;
    }
  }
  .hidden {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: var(--header_hidden_background);
    height: 100%;
    transition: var(--transition);
    cursor: pointer;
    svg {
      transform: rotate(180deg);
      width: 8px;
      height: 16px;
      fill: var(--header_hidden_icon_color);
      transition: transform var(--transition);
    }
  }
  .path__scroll {
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
    width: fit-content;
    height: 100%;
    overflow: auto;
    /* transition: all 2s linear; */
    .hidden {
      width: 0px !important;
      height: 0px;
      overflow: hidden;
      padding: 0 !important;
      /* margin: 0; */
    }
    .active {
      background: var(--header_path_background_active) !important;
      box-shadow: var(--header_path_shadow_active) !important;
      color: var(--header_path_color_active) !important;
      pointer-events: none !important;
      font-weight: 500 !important;
    }
    .path__item {
      flex-shrink: 0;
      background: var(--header_path_background);
      box-shadow: var(--header_path_shadow);
      padding: 4px 16px;
      border-radius: var(--radius);
      font-size: 15px;
      line-height: 1.2;
      text-align: center;
      white-space: nowrap;
      color: var(--header_path_color);
      width: fit-content;
      transform-orgin: left;
      /* transition: var(--transition); */
      cursor: pointer;
      :hover {
        opacity: 0.9 !important;
      }
    }
    .hidden-delimiter {
      width: 0px !important;
      height: 0px !important;
      margin: 0px !important;
    }
    .path__delimiter {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 7px;
      height: 13px;
      margin: 0 10px;
      svg {
        fill: var(--header_delimiter_background);
        width: 100%;
        height: 100%;
      }
    }
    .route {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .route__time.svelte-1puig2g {
      font-size: 14px;
      margin-bottom: -3px;
    }
    .route__time.svelte-1puig2g,
    .route__distance.svelte-1puig2g {
      color: var(--header_delimiter_color);
      line-height: 1.2;
      white-space: nowrap;
    }
    .route__delimiter.svelte-1puig2g {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 0 10px;
    }
    .route__line.svelte-1puig2g {
      width: 80px;
      height: 1px;
      background: var(--header_delimiter_background);
    }
    .route__icon.svelte-1puig2g {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 7px;
      height: 13px;
    }
    .route__icon.svelte-1puig2g svg {
      fill: var(--header_delimiter_background);
      width: 100%;
      height: 100%;
    }
    .route__distance.svelte-1puig2g {
      font-size: 12px;
      margin-top: -3px;
    }
    .route__time.svelte-1puig2g,
    .route__distance.svelte-1puig2g {
      color: var(--header_delimiter_color);
      line-height: 1.2;
      white-space: nowrap;
    }
    .path__item.disabled {
      background: var(--header_path_background_disabled);
      box-shadow: var(--header_path_shadow_disabled);
      color: var(--header_path_color_disabled);
      border: 1px solid var(--header_path_border_disabled);
    }
  }
`;

// const Style = styled.header`
//   position: absolute;
//   top: 0rem;
//   left: 0rem;
//   margin: 2rem;

//   display: flex;
//   height: 50px;
//   max-width: 100%;
//   width: fit-content;
//   /* background-color: var(--background_panel); */
//   /* border-radius: var(--radius); */
//   z-index: 13;
//   pointer-events: all;
//   align-items: center;
//   overflow: hidden;
//   transition: all 800ms linear !important;

//   button {
//     border: 0;
//     border-radius: 0;
//     padding: 5px 10px;
//     background-color: #006fff;
//     color: #fff;
//     flex-shrink: 0;
//     cursor: pointer;
//     margin: 0;
//   }

//   .logo {
//     margin: 0 13px;
//     object-fit: content;
//     svg {
//       width: 120px;
//       height: 50px;
//       display: grid;
//       place-items: center;
//     }
//   }

//   .back {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     flex-shrink: 0;
//     background: none;
//     border: none;
//     margin: 0;
//     padding: 0;
//     /* opacity: var(--header_up_opacity); */
//     transition: opacity var(--transition);
//     cursor: pointer;
//     color: #fff;

//     svg {
//       width: 17px;
//       height: 17px;
//       fill: var(--secondary_border);
//       opacity: 0.8;
//     }

//     .back__text {
//       margin-top: 2px;
//       font-size: 9px;
//       text-transform: uppercase;
//       text-align: center;
//       color: var(--secondary_border);
//     }
//   }

//   .path {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     touch-action: pan-x;
//     overflow: hidden;
//   }

//   .active {
//     svg {
//       transform: rotate(0deg) !important;
//     }
//   }

//   .hidden {
//     position: relative;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-shrink: 0;
//     background: var(--secondary_transparent_bg);
//     border: 1px solid var(--secondary_border);
//     height: 100%;
//     transition: var(--transition);
//     cursor: pointer;
//     svg {
//       transform: rotate(180deg);
//       width: 8px;
//       height: 16px;
//       fill: var(--secondary_text);
//       transition: transform var(--transition);
//     }
//   }

//   .path__scroll {
//     padding: 0 20px;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     flex-shrink: 0;
//     width: fit-content;
//     height: 100%;
//     overflow: auto;
//     /* transition: all 2s linear; */

//     .hidden {
//       width: 0px !important;
//       height: 0px;
//       overflow: hidden;
//       padding: 0 !important;
//       /* margin: 0; */
//     }

//     .active {
//       background: var(--secondary_bg) !important;
//       box-shadow: var(--header_path_shadow_active) !important;
//       color: var(--light_black) !important;
//       pointer-events: none !important;
//       font-weight: 500 !important;
//     }
//     .path__item {
//       flex-shrink: 0;
//       background: var(--secondary_transparent_bg);
//       box-shadow: var(--box_shadow);
//       border: 1px solid var(--secondary_border);
//       padding: 4px 16px;
//       border-radius: var(--border_radius);
//       /* border-radius: var(--radius); */
//       font-size: 15px;
//       line-height: 1.2;
//       text-align: center;
//       white-space: nowrap;
//       color: var(--secondary_text);
//       width: fit-content;
//       transform-orgin: left;
//       /* transition: var(--transition); */

//       cursor: pointer;
//     }

//     .hidden-delimiter {
//       width: 0px !important;
//       height: 0px !important;
//       margin: 0px !important;
//     }

//     .path__delimiter {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-shrink: 0;
//       width: 7px;
//       height: 13px;
//       margin: 0 10px;
//       svg {
//         fill: var(--header_delimiter_background);
//         width: 100%;
//         height: 100%;
//       }
//     }

//     .route {
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//     }

//     .route__time.svelte-1puig2g {
//       font-size: 14px;
//       margin-bottom: -3px;
//     }

//     .route__time.svelte-1puig2g,
//     .route__distance.svelte-1puig2g {
//       color: var(--header_delimiter_color);
//       line-height: 1.2;
//       white-space: nowrap;
//     }

//     .route__delimiter.svelte-1puig2g {
//       display: flex;
//       flex-direction: row;
//       align-items: center;
//       justify-content: center;
//       width: 100%;
//       padding: 0 10px;
//     }

//     .route__line.svelte-1puig2g {
//       width: 80px;
//       height: 1px;
//       background: var(--header_delimiter_background);
//     }

//     .route__icon.svelte-1puig2g {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-shrink: 0;
//       width: 7px;
//       height: 13px;
//     }
//     .route__icon.svelte-1puig2g svg {
//       fill: var(--header_delimiter_background);
//       width: 100%;
//       height: 100%;
//     }

//     .route__distance.svelte-1puig2g {
//       font-size: 12px;
//       margin-top: -3px;
//     }

//     .route__time.svelte-1puig2g,
//     .route__distance.svelte-1puig2g {
//       color: var(--header_delimiter_color);
//       line-height: 1.2;
//       white-space: nowrap;
//     }

//     .path__item.disabled {
//       background: var(--header_path_background_disabled);
//       box-shadow: var(--header_path_shadow_disabled);
//       color: var(--header_path_color_disabled);
//       border: 1px solid var(--header_path_border_disabled);
//     }
//   }
// `;

const Path = ({ collapsed, isFirst, isActive, title, onClick }) => (
  <>
    {!isFirst && (
      <Delimiter
        className={
          collapsed ? "path__delimiter hidden-delimiter" : "path__delimiter"
        }
      />
    )}
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={
        collapsed
          ? isActive
            ? "path__item active animate__animated animate__fadeInLeft animate__faster"
            : "path__item animate__animated animate__fadeOutLeft hidden"
          : isActive
          ? "path__item active animate__animated animate__fadeInLeft"
          : "path__item animate__animated animate__fadeInLeft"
      }
    >
      {title}
    </button>{" "}
  </>
);

const BackButton = ({ onClick }) => (
  <button class="back" onClick={onClick}>
    <div class="back__icon">
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6.60209 7.94657C6.60209 8.70348 6.59248 9.38368 6.60689 10.0632C6.61307 10.3612 6.52455 10.6023 6.28509 10.7287C6.02435 10.8668 5.754 10.8866 5.50081 10.6469C4.79612 9.9784 4.08046 9.32304 3.3696 8.66184C2.49681 7.85012 1.62402 7.03914 0.752597 6.22597C0.624286 6.10615 0.494602 5.98341 0.383445 5.84605C0.124763 5.52677 0.185831 5.08913 0.531655 4.76474C1.86966 3.50736 3.20973 2.25289 4.54979 0.998427C4.8764 0.693031 5.18792 0.362793 5.54541 0.104886C5.70185 -0.00762815 5.96465 -0.0178567 6.16364 0.0194046C6.44016 0.0712782 6.60552 0.284617 6.60278 0.614124C6.59797 1.22273 6.61101 1.83133 6.5966 2.43993C6.59043 2.69564 6.69609 2.76724 6.91223 2.79208C9.54433 3.09017 12.0282 3.85659 14.2178 5.50047C15.3575 6.35602 16.2673 7.4176 16.6955 8.87664C17.1641 10.4738 16.8272 11.9094 15.9139 13.2121C14.7715 14.8406 13.1782 15.7963 11.4416 16.524C11.3688 16.5547 11.2934 16.5788 11.2213 16.6116C10.9736 16.7256 10.7334 16.7227 10.6141 16.4378C10.494 16.1521 10.6154 15.9417 10.8789 15.7897C11.2652 15.5676 11.6488 15.3331 12.0097 15.0671C12.7123 14.5477 13.2489 13.8879 13.4836 12.9827C13.7285 12.0373 13.4506 11.2409 12.8791 10.5373C11.9891 9.43994 10.7952 8.87518 9.52306 8.50037C8.8026 8.28849 8.05194 8.19278 7.31432 8.05031C7.09544 8.00867 6.87312 7.98529 6.60209 7.94657Z"></path>
      </svg>
    </div>{" "}
    <div class="back__text">Up</div>
  </button>
);

const CollapseButton = ({ onClick, isCollapsed }) => (
  <button
    className={isCollapsed ? "hidden" : "active hidden"}
    onClick={onClick}
  >
    <svg
      width="8"
      height="16"
      viewBox="0 0 8 16"
      xmlns="http://www.w3.org/2000/svg"
      clas
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.46919 0.280537C7.67885 0.460248 7.70313 0.775898 7.52342 0.985561L1.80233 7.66017L7.52342 14.3348C7.70313 14.5444 7.67885 14.8601 7.46918 15.0398C7.25952 15.2195 6.94387 15.1952 6.76416 14.9856L0.764162 7.98556C0.603666 7.79832 0.603666 7.52201 0.764162 7.33477L6.76416 0.33477C6.94387 0.125107 7.25952 0.100826 7.46919 0.280537Z"
      ></path>
    </svg>
  </button>
);

const Delimiter = ({ className }) => (
  <div className={className}>
    <svg
      width="7"
      height="13"
      viewBox="0 0 7 13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="var(--secondary_border)"
        // fill="var(--secondary_transparent_bg)"
        fill="white"
        opacity={0.7}
        d="M0.13623 1.5146L0.13623 11.7627C0.13623 12.2866 0.760591 12.5589 1.1445 12.2024L6.66273 7.07835C6.91837 6.84097 6.91837 6.43638 6.66273 6.199L1.1445 1.07492C0.760592 0.718436 0.13623 0.990702 0.13623 1.5146Z"
      ></path>
    </svg>
  </div>
);

const Logo = () => (
  <div className="logo-wrapper">
    <Link to="/">
      <img src={`${process.env.PUBLIC_URL}/logo.png`} />
    </Link>
  </div>
);

export const RouteDetails = ({ landMarkRouteDetails }) => {
  const { time, distance, landmark_name } = landMarkRouteDetails;

  return (
    <>
      <div class="route svelte-1puig2g">
        <div class="route__time svelte-1puig2g">&nbsp; {time} &nbsp;</div>{" "}
        <div class="route__delimiter svelte-1puig2g">
          <div class="route__line svelte-1puig2g"></div>{" "}
          <div class="route__icon svelte-1puig2g">
            <svg
              width="7"
              height="13"
              viewBox="0 0 7 13"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.13623 1.5146L0.13623 11.7627C0.13623 12.2866 0.760591 12.5589 1.1445 12.2024L6.66273 7.07835C6.91837 6.84097 6.91837 6.43638 6.66273 6.199L1.1445 1.07492C0.760592 0.718436 0.13623 0.990702 0.13623 1.5146Z"></path>
            </svg>
          </div>
        </div>{" "}
        <div class="route__distance svelte-1puig2g">
          &nbsp; {distance} &nbsp;
        </div>
      </div>
      <button class="path__item disabled">{landmark_name}</button>
    </>
  );
};
