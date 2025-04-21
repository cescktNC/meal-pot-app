import { searchForm } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useHttpData<T>(url: string) {
  const [data, setData] = useState<T[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetching all categories from the API
  useEffect(() => {
    let ignore = false; // Flag to ignore the effect if the component unmounts
    const controller = new AbortController(); // Create a new AbortController instance
    const signal = controller.signal; // Get the signal from the controller
    setLoading(true);
    axios
      .get<{ meals: T[] }>(url, { signal }) // Pass the signal to the request
      .then(({ data }) => {
        if (!ignore) setData(data.meals);
      })
      .finally(() => {
        if (!ignore) setLoading(false); // Set loading to false only if the component is still mounted
      });

    return () => {
      ignore = true; // Set the flag to true when the component unmounts
      controller.abort();
    }; // Cleanup function to abort the request
  }, []);

  // Fetching meals by name from the API
  // This function is called when the user submits the search form
  const fetchMealsByName = async (mealName: searchForm) => {
    const url = `${baseUrl}${import.meta.env.VITE_API_URL_MEAL_BY_NAME}${
      mealName.search
    }`;
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);

    axios
      .get<{ meals: T[] }>(url, { signal })
      .then(({ data }) => {
        if (!data.meals) {
          setData([]);
          return;
        }
        setData(data.meals);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort(); // Cleanup function to abort the request
    };
  };

  const fetchMealsByArea = async (area: string) => {
    const url = `${baseUrl}${import.meta.env.VITE_API_URL_MEAL_BY_AREA}${area}`;
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);

    axios
      .get<{ meals: T[] }>(url, { signal })
      .then(({ data }) => {
        if (!data.meals) {
          setData([]);
          return;
        }
        setData(data.meals);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort(); // Cleanup function to abort the request
    };
  };

  return { loading, data, setData, fetchMealsByName, fetchMealsByArea };
}
