import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useContext,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Carousel from "../Components/Molecules/Carousel";

import { useInventories } from "../Hooks";
import Flat from "../Components/Molecules/Flat";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FloorSelector from "../Components/Molecules/FloorSelector";
import ApartmentsDetails from "../Components/Molecules/ApartmentsDetails";
import Compass from "../Components/Atoms/Compass";
import IconButton from "../Components/Atoms/IconButton";
import { FullScreenIcon } from "../Icons";
import { getCombinedTowerName, toggleFullScreen } from "../Utility/function";
import Navigator from "./Molecules/Navigator";
import { BOOKING_MODES, TOWERS, getFloorType } from "../Data";
import Zoomable from "../Components/Molecules/Zoomable";
import { useBookings } from "../Hooks/booking";
import { createOrder } from "../APIs/cashfree";
import { cashfreeProd } from "cashfree-dropjs";
import { message, Modal } from "antd";
import Loading from "./Components/Atoms/Loading";
import ReturnToPrev from "../Components/Atoms/ReturnToPrev";
import PaymentsWindow from "../Components/Molecules/PaymentsWindow";
import ProjectVideoBtn from "./Components/Molecules/ProjectVideoBtn";
import {
  COMPASS_ANGLES,
  getCombinedTowerFromTower,
  getFlatVrTours,
} from "../Utility/Constants";
import { AppContext } from "../Contexts/AppContext";
import Disclaimer from "../Components/Molecules/Disclaimer";
import CollapsiblePanel from "../Components/Molecules/CollapsiblePanel";
import CollapsibleAppartmentDetails from "../Components/Molecules/CollapsibleAppartmentDetails";
import ReraNumber from "../Components/Molecules/ReraNumber";

function Unit() {
  const { inventories } = useContext(AppContext);
  const [imageNumber, setImageNumber] = useState(2);
  const [buttonClicked, setButtonClicked] = React.useState("");

  const { unit: unitId } = useParams();

  const { getUnitById } = useInventories();

  const [unit, setUnit] = useState(null);

  const { tower, floor, unit_number } = unit || {};

  useEffect(() => {
    if (!unitId) return;
    setUnit(getUnitById(unitId));
  }, [unitId, inventories]);

  const navigate = useNavigate();

  const { fetchInventories } = useInventories();

  const [loading, setLoading] = useState(false);
  const paymentWrapperref = useRef();
  const { saveUserToDB } = useBookings();

  const [showPaymentsPopup, setShowPaymentsPopup] = useState(false);

  const handleBooking = async (flatId, userDetails) => {
    // const paymentId = "885594491";
    // const orderId = "order_2244182Eo24wxkRsyeBzKENw2uWSkM1lR";
    // try {
    //   userDetails.mode = BOOKING_MODES.ONLINE;
    //   setLoading(true);
    //   const { mobile: phone, firstName, lastName, email } = userDetails;
    //   const user_id = await saveUserToDB(userDetails);
    //   const order_response = await createOrder(flatId, {
    //     name: firstName + " " + lastName,
    //     email,
    //     customer_id: user_id,
    //     phone,
    //   });
    //   if (!order_response) {
    //     setLoading(false);
    //     return;
    //   }
    //   setShowPaymentsPopup(true);
    //   // window.location.replace(order_response.payment_link);
    //   const { orderToken } = order_response;
    //   let cashfree = new cashfreeProd.Cashfree();
    //   const dropConfig = {
    //     components: [
    //       "order-details",
    //       "card",
    //       "netbanking",
    //       "app",
    //       "upi",
    //       "paylater",
    //       "credicardemi",
    //       "cardlessemi",
    //     ],
    //     orderToken,
    //     onSuccess: function (data) {
    //       message.success("Payment Successful");
    //       setShowPaymentsPopup(false);
    //       const paymentId = data.transaction.transactionId;
    //       const orderId = data.order.orderId;
    //       fetchInventories();
    //       navigate(
    //         `/SVN/tower/${tower}/floor/${floor}/unit/${flatId}/payment-success/${orderId}/${paymentId}`
    //       );
    //       //on payment flow complete
    //     },
    //     onFailure: function (data) {
    //       if (data?.order?.errorText) message.error(data.order.errorText);
    //       //on failure during payment initiation
    //     },
    //     style: {
    //       //to be replaced by the desired values
    //       backgroundColor: "#ffffff",
    //       color: "#11385b",
    //       fontFamily: "Lato",
    //       fontSize: "14px",
    //       errorColor: "#ff0000",
    //       theme: "light", //(or dark)
    //     },
    //   };
    //   setTimeout(() => {
    //     cashfree.initialiseDropin(
    //       document.getElementById("payment-body"),
    //       dropConfig
    //     );
    //     setLoading(false);
    //   }, 1000);
    // } catch (error) {
    //   message.error(error);
    // }
  };
  const handlePrevImage = () => {
    setButtonClicked("prev");
    setImageNumber((prev) => (prev < 2 ? 3 : prev - 1));
  };
  const handleNextImage = () => {
    setButtonClicked("next");
    setImageNumber((prev) => (prev > 2 ? 1 : prev + 1));
  };

  if (!unit) return <Loading />;
const link = `${
  getFloorType(tower, floor) === "ground"
    ? "typical"
    : getFloorType(tower, floor)
}/${unit?.unit_type.toLowerCase().split("+")[0].replaceAll(" ", "")}`;
  console.log("url", link)
  return (
    <CarouselPageStyle>
      {loading && <Loading />}
      {/* <PaymentsWindow
        flat={flats[currentFlatIndex]}
        setShowPaymentsPopup={setShowPaymentsPopup}
        showPaymentsPopup={showPaymentsPopup}
      /> */}
      {/* <ProjectVideoBtn /> */}
      <Disclaimer />
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
            path: `/SVN/tower/${getCombinedTowerFromTower(tower)}`,
          },
          {
            title: `${floor == 0 ? `Ground Floor` : `Floor ${floor}`}`,
            path: `/SVN/tower/${tower}/floor/${floor}`,
          },
        ]}
        currentPage={{
          title: `Apartment ${unit_number}`,
          path: `/SVN/unit/${unitId}`,
        }}
      />
      <ReturnToPrev
        text="Return To Floor Plan"
        to={`/SVN/tower/${tower}/floor/${floor}`}
      />
      <div className="floor-selector">
        <FloorSelector currentFloor={floor} currentTower={tower} />
      </div>
      <div className="compass-fullscreen-wrapper absolute bottom right flex row">
        {/* <div className="col flex j-end">
          <Compass
            angle={COMPASS_ANGLES.TOWERS[getCombinedTowerName(tower)] - 25}
          />
        </div> */}
        <div className="col w-space flex j-end">
          <IconButton
            icon={FullScreenIcon}
            tooltip="Fullscreen"
            activeTooltip="Close Fullscreen"
            onClick={() => toggleFullScreen()}
          />
        </div>
      </div>
      <div className="left-panels">
        <CollapsibleAppartmentDetails title={"Apartment Details"}>
          <ApartmentsDetails
            onVRClick={() => {
              navigate("vr-tour");
            }}
            selectedUnit={unit}
            handleBooking={handleBooking}
          />
        </CollapsibleAppartmentDetails>
      </div>
      <button
        className={`absolute bottom-[30%] rounded-md right-[100px] cursor-pointer z-10 bg-[#363636] `}
        onClick={handleNextImage}
      >
        {" "}
        <img
          className="hover:scale-110 rotate-90"
          alt="next-arrow"
          src={`/up_arrow.svg`}
        />
      </button>
      <button
        className={`absolute bottom-[30%] rounded-md right-[68vw] cursor-pointer z-10  bg-[#363636] `}
        onClick={handlePrevImage}
      >
        {" "}
        <img
          className="hover:scale-110 -rotate-90"
          alt="next-arrow"
          src={`/up_arrow.svg`}
        />
      </button>
      {}
      <Zoomable>
        {/* <Flat
            src={`${unit?.unit_type
              .toUpperCase()
              .split("+")[0]
              .replaceAll(" ", "")}/${imageNumber}`}
          /> */}

        <Flat
          src={link}
          imageNumber={imageNumber}
          setButtonClicked={setButtonClicked}
          buttonClicked={buttonClicked}
        />
      </Zoomable>
      
    </CarouselPageStyle>
  );
}

export default Unit;

const CarouselPageStyle = styled.section`
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
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;

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
  .navigator {
    position: absolute;
    top: 0rem;
    left: 0rem;
    margin: 2rem;
  }
  .compass-fullscreen-wrapper {
    padding: 1rem;
    padding-right: 2rem;
  }

  .floor-selector {
    position: absolute;
    top: 7rem;
    left: 2rem;
    /* right: 100%; */
  }

  .zoom-control {
    position: absolute;
    right: 0px;
    bottom: 50%;
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
`;
