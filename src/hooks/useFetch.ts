import axios from "axios";
import { useState } from "react";

type FetchOptions = {
  onNotFound?: string;
  onError?: string;
};

export default <T>() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string | null>(null);

  const fetch = async (url: string, options?: FetchOptions) => {
    setLoading(true);
    setError(null); // Reset error state before fetching

    try {
      const { data } = await axios.get(url);
      if (data.meals && data.meals.length > 0) {
        setData(data.meals[0]);
      } else {
        setData(undefined); // Set data to undefined if no meals found
        setError(options?.onNotFound || "No results found.");
      }
    } catch (error) {
      console.error("Error fetching data:", (error as Error).message);
      setError(
        options?.onError ||
          "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, fetch };
};
