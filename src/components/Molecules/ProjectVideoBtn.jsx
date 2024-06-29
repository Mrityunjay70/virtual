import React from "react";
import { useState } from "react";
import styled from "styled-components";
import PopupVideoPlayer from "./PopupVideoPlayer";

function ProjectVideoBtn(props) {
  const [videoOpened, setVideoOpened] = useState(false);

  return (
    <>
      <PopupVideoPlayer
        open={videoOpened}
        setOpen={setVideoOpened}
        src="/WhatsApp Video 2024-03-19 at 11.07.05_f0230ccc.mp4"
      />
      <Style onClick={() => setVideoOpened(true)}>Explore Project</Style>
    </>
  );
}

const Style = styled.button`
  top: 2.3rem;
  color: var(--color_text);
  width: fit-content;
  margin: auto;
  position: absolute;
  box-shadow: 0 0 1px #07070756;
  padding: 0.5rem 1rem;
  font-weight: 500;
  border-radius: 5px;
  right: 6rem;
  background: rgba(76, 106, 148, 0.829);
  opacity: 0.8;
  transition: all 100ms ease-in-out;
  border: none;
  z-index: 100;
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`;

export default ProjectVideoBtn;
