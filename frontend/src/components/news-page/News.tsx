import React, { useState, useEffect } from "react";

export const News: React.FunctionComponent = () => {
  const [response, setResponse] = useState<string[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = String(today.getFullYear());

    // today = mm + '/' + dd + '/' + yyyy;
    const todayData = yyyy + "-" + mm + "-" + dd;
    console.log(todayData);
    const url = `https://newsapi.org/v2/everything?q=Whales&from=${todayData}&sortBy=popularity&apiKey=08206669f0354799ae8a7553cc7dbe53`;
  }, []);
  //     const fetchData = async () => {
  //       try {
  //         setIsLoading(true)
  //         const response = await fetch(url);
  //         const json: PhotoApiResponse = await response.json();
  //         const photos = json.photos;
  //         setPhotosUrls(photos.map(x => x.img_src));
  //         setIsLoading(false);
  //       } catch (error) {
  //         console.log("error", error);
  //       }
  //     };
  //     fetchData();
  //   }, [sol]);

  return <></>;
};
