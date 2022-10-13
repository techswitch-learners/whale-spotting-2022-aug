import React, { useState, useEffect } from "react";
import { getTopWhaleVideos, RedditVideo } from "../../clients/redditApiClient";

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
        {articlesList &&
          articlesList?.map((article: RedditVideo) => (
            <div className="videoCard" key={article.id}>
              <p
                key={article.id}
                dangerouslySetInnerHTML={{ __html: article.title }}
              ></p>
              {/* <p key={article.id}>{article.created}</p> */}
              <video
                key={article.media.reddit_video.fallback_url}
                src={article.media.reddit_video.fallback_url}
                width="320"
                height="320"
                controls
              />
            </div>
          ))}
      </>
    );
  }
};
