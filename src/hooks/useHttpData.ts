import axios from "axios";
import { useEffect, useState } from "react";

export default function useHttpData<T>(url: string) {
  const [data, setData] = useState<T[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  // Fetching all categories from the API
  useEffect(() => {
    let ignore = false; // Flag to ignore the effect if the component unmounts
    const controller = new AbortController(); // Create a new AbortController instance
    const signal = controller.signal; // Get the signal from the controller
    setLoading(true);
    axios
      .get<{ meals: T[] }>(url, { signal }) // Pass the signal to the request
      .then(({ data }) => {
        if (!ignore) {
          if (!data.meals) {
            setData([]); // Set data to an empty array if no meals found
            return;
          }
          setData(data.meals);
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false); // Set loading to false only if the component is still mounted
      });

    return () => {
      ignore = true; // Set the flag to true when the component unmounts
      controller.abort();
    }; // Cleanup function to abort the request
  }, [url]);

  return { loading, data, setData };
}
