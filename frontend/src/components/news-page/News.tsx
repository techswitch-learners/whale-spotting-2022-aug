import React, { useState, useEffect } from "react";
import { getTopWhaleVideos, RedditVideo } from "../../clients/redditApiClient";
import { NewsCard } from "./NewsCard";

export const News: React.FunctionComponent = () => {
  const [articlesList, setArticlesList] = useState<RedditVideo[]>();
  const [pageStatus, setPageStatus] = useState<boolean>(true);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const videos = await getTopWhaleVideos();
        setArticlesList(videos);
      } catch (err) {
        console.log("error", err);
        setPageStatus(false);
      }
    };

    getVideos();
  }, []);

  if (pageStatus == false) {
    return (
      <>
        <h1>Whale content</h1>
        <p>Error Message</p>
      </>
    );
  } else {
    return (
      <>
        <h1>Whale content</h1>
        <ul>
          {articlesList &&
            articlesList?.map((video: RedditVideo) => (
              <li key={video.id}>
                <NewsCard video={video} />
              </li>
            ))}
        </ul>
      </>
    );
  }
};
