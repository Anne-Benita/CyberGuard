// src/components/Dashboard/FilterContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create the context
export const FilterContext = createContext();

// Provider component to wrap the whole app
export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    country: "All",
    severity: "All",
    threatType: "All",
    timeRange: "All",
  });

  // ✅ Update one filter at a time
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Optional: reset all filters at once
  const resetFilters = () => {
    setFilters({
      country: "All",
      severity: "All",
      threatType: "All",
      timeRange: "All",
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters, // for direct full updates
        updateFilter, // for individual changes
        resetFilters, // for resetting all filters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

// ✅ Custom hook for easy usage
export const useFilter = () => useContext(FilterContext);
