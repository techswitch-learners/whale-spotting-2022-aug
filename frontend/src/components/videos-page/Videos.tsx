import React, { useState, useEffect } from "react";
import { getTopWhaleVideos, RedditVideo } from "../../clients/redditApiClient";
import { VideoCard } from "./VideoCard";
import "./Videos.scss";

export const Videos: React.FunctionComponent = () => {
  const [videos, setVideos] = useState<RedditVideo[]>();
  const [pageErrorStatus, setPageErrorStatus] = useState<boolean>(false);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const videos = await getTopWhaleVideos();
        setVideos(videos);
      } catch (err) {
        console.error("Error encountered when loading list of videos!");
        setPageErrorStatus(true);
      }
    };

    getVideos();
  }, []);

  let pageContent = <></>;

  if (pageErrorStatus == true) {
    pageContent = (
      <p>Error loading content...Please reload or try again later!</p>
    );
  } else {
    pageContent = (
      <ul className="news-list">
        {videos &&
          videos?.map((video: RedditVideo) => (
            <li key={video.id}>
              <VideoCard video={video} />
            </li>
          ))}
      </ul>
    );
  }

  return (
    <>
      <h1>Whale content</h1>
      {pageContent}
    </>
  );
};
