import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";

const URI = "https://worldwise-backend-rwp5.onrender.com";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  err: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${URI}/api/cities`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        //console.log(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.error("Error fetching cities:", err);
        dispatch({
          type: "rejected",
          payload: "There was some error in loading cities...",
        });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity._id) return;

    dispatch({ type: "loading" });
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${URI}/api/cities/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      //console.log(data);

      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was some error in loading city...",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${URI}/api/cities`, newCity, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was some error in adding the city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${URI}/api/cities/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      //console.log(data);

      dispatch({ type: "city/deleted", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was some error in deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
