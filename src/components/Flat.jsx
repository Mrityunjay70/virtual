import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FullScreenIcon } from "../../Icons";
import Compass from "../Atoms/Compass";
import IconButton from "../Atoms/IconButton";
import { toggleFullScreen, toogleHideOverlays } from "../../Utility/function";
import { FLOORS_IMGS } from "../../Data/flatSvgs";
import { Carousel } from "react-responsive-carousel";
import Loading from "../Atoms/Loading";
import ImageLoader from "../Atoms/ImageLoader";

function Flat({ src, imageNumber, buttonClicked }) {
  const [loading, setloading] = useState(true);
  const numberOfImages = [1, 2, 3];

  const ref = useRef(null);
  const onImageLoad = () => {
    const element = ref.current;
    if (buttonClicked == "prev") {
      setTimeout(() => {
        element.classList.remove("animate__fadeOutLeft");
        element.classList.add("animate__fadeInRight");
      }, 100);
    }
    if (buttonClicked == "next") {
      setTimeout(() => {
        element.classList.remove("animate__fadeOutRight");
        element.classList.add("animate__fadeInLeft");
      }, 100);
    }
    setloading(false);
  };
  // useEffect(() => {
  //   // setImageShown("");
  //   setloading(true);
  //   const element = ref.current;
  //   element.classList.remove("animate__fadeOutLeft");
  //   element.classList.remove("animate__fadeOutRight");
  //   element.classList.remove("animate__fadeInLeft");
  //   element.classList.remove("animate__fadeInRight");
  //   if (buttonClicked.length > 0) {
  //     if (buttonClicked == "prev") {
  //       element.classList.add("animate__fadeOutLeft");
  //       // setTimeout(() => {
  //       //   element.classList.add("animate__fadeInRight");
  //       //   element.classList.remove("animate__fadeOutLeft");
  //       // }, 1000);
  //     }

  //     if (buttonClicked == "next")
  //       element.classList.add("animate__fadeOutRight");
  //     // setTimeout(() => {
  //     //   element.classList.add("animate__fadeInLeft");
  //     //   element.classList.remove("animate__fadeOutRight");
  //     // }, 1000);
  //   }
  // }, [src]);
  return (
    <>
      {loading && <ImageLoader />}
      <FlatStyle ref={ref} className={`no-select animate__animated`}>
        {/* {buttonClicked && <div className="loader "> Loading...</div>} */}
        <div
          style={{
            width: "100vw",
            // opacity: imageLoading ? "0.1" : "1",
          }}
          className="img-wrapper"
        >
          {/* <div className="flat-number">{flatNumber}</div> */}
          {numberOfImages.map((val, index) => (
            <img
              hidden={val !== imageNumber}
              src={`/flats/${src}/${val}.png`}
              onLoad={() => setloading(false)}
            />
          ))}
        </div>
      </FlatStyle>
    </>
  );
}

export default Flat;

const FlatStyle = styled.section`
  transition: all 500ms ease-in-out;
  height: 100vh;
  width: 100%;
  cursor: default;
  /* margin-left: 8rem;
  margin-top: 2rem;
  */
  .flat-number {
    font-family: "Roboto", sans-serif;
    background-color: var(--panel_background);
    color: var(--color_text);
    width: fit-content;
    margin: auto;
    padding: 0.3rem 1rem;
    font-weight: 600;
    border-radius: 10px;
    font-size: 1.2rem;
    position: absolute;
    top: 0;
  }
  .img-wrapper {
    /* padding-top: 2rem; */
    transition: all 500ms ease-in-out;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 4rem;
    padding-left: 18%;

    img {
      transition: all 500ms ease-in-out;
      border-radius: 10px;
      width: auto;
      height: 85%;
      object-fit: contain;
    }
  }
  @media screen and (max-height: 480px) {
    .flat-number {
      font-size: 1rem;
    }
  }
`;
