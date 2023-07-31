import { useEffect, useState } from "react";

const useHttp = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDate = async () => {
      setIsLoading(true);

      const response = await fetch(url);
      const data = await response.json();

      setIsLoading(false);
      setData(data);
    };

    fetchDate();
  }, [url]);

  return { data, isLoading };
};

export default useHttp;
