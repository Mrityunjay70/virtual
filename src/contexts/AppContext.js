import { createContext, useContext, useEffect, useState } from "react";
import { screen1PageMapFilters, PAGES } from "../Data";
import { fetchAndGetInventories, fetchUserFromToken } from "..";

export const AppContext = createContext();
let intervalId = null;
export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [activeMapFilterIds, setActiveMapFilterIds] = useState([]);
  const [flatFilterPriceValues, setFlatFilterPriceValues] = useState([]); // price range
  const [flatFilterSizeValues, setFlatFilterSizeValues] = useState([]); // size range

  const [selectedLandmarkId, setSelectedLandmarkId] = useState(null);
  const [blackout, setBlackout] = useState(false);
  const [user, setUser] = useState(null);
  const [inventories, setInventories] = useState(null);
  const [inventoriesList, setInventoriesList] = useState([]);
  const [bookings, setBookings] = useState(null);
  const [users, setUsers] = useState(null);
  const [booknowVisible, setIsBookNowVisible] = useState(false);
  const [otpStatus, setOtpStatus] = useState(null);

  //from capital walk

  const INVENTORY_UPDATE_INTERVAL = 1 * 60 * 1000; // 1 minute

  const [fetchedData, setFetchedData] = useState(false);
  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const fetchedSuccess = await fetchAndGetInventories(setInventories);
      if (fetchedSuccess) setFetchedData(true);
      else setUser(null);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    })();
  }, [user]);

  useEffect(() => {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      fetchAndGetInventories(setInventories);
    }, INVENTORY_UPDATE_INTERVAL);
  }, []);

  const fetchAndSetUser = async () => {
    setLoading(true);
    const user = await fetchUserFromToken();

    setLoading(false);
    if (user) {
      setUser(user);
      return;
    }
    setUser(null);
  };

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  const notLoggedIn = !loading && !user;
  //===============================================

  return (
    <AppContext.Provider
      value={{
        inventoriesList,
        setInventoriesList,
        flatFilterPriceValues,
        flatFilterSizeValues,
        setFlatFilterPriceValues,
        setFlatFilterSizeValues,
        activeMapFilterIds,
        setActiveMapFilterIds,
        selectedLandmarkId,
        setSelectedLandmarkId,
        blackout,
        setBlackout,
        inventories,
        setInventories,
        bookings,
        setBookings,
        users,
        setUsers,
        notLoggedIn,
        fetchedData,
        user,
        setUser,
        booknowVisible,
        setIsBookNowVisible,
        otpStatus,
        setOtpStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useLoading = () => {
  const { loading, setLoading } = useContext(AppContext);
  return { loading, setLoading };
};
