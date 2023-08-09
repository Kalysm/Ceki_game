import React, { createContext, useContext, useState } from "react";

const TimeContext = createContext();

export const useTime = () => useContext(TimeContext);

export const TimeProvider = ({ children }) => {
  const [selectedDuration, setSelectedDuration] = useState(30);

  return (
    <TimeContext.Provider value={{ selectedDuration, setSelectedDuration }}>
      {children}
    </TimeContext.Provider>
  );
};
