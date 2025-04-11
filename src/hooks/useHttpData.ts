import axios from "axios";
import { useEffect, useState } from "react";

export default function useHttpData<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetching all categories from the API
  useEffect(() => {
    const controller = new AbortController(); // Create a new AbortController instance
    const signal = controller.signal; // Get the signal from the controller
    setLoading(true);
    axios
      .get<{ meals: T[] }>(url, { signal }) // Pass the signal to the request
      .then(({ data }) => setData(data.meals))
      .finally(() => setLoading(false));

    return () => controller.abort(); // Cleanup function to abort the request
  }, []);

  return { loading, data };
}
