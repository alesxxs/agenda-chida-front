import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";

const AppContext = createContext();

export const AppContextProvider = (props) => {
  const { children } = props;

  const [isLoader, setIsLoader] = useState(false);
  const [todayTotalAppointments, setTodayTotalAppointments] = useState("");
  const [isAttended, setIsAttended] = useState(false);
  const [addedAppointment, setAddedApointment] = useState(false);

  const contextValue = useMemo(() => {
    const contextAppState = {
      isLoader,
      setIsLoader,
      todayTotalAppointments,
      setTodayTotalAppointments,
      isAttended,
      setIsAttended,
      addedAppointment,
      setAddedApointment,
    };

    return contextAppState;
  }, [isLoader, todayTotalAppointments, isAttended, addedAppointment]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
