import React, { useState, useEffect } from "react";
import { getTopWhaleVideos, RedditVideo } from "../../clients/redditApiClient";

export const News: React.FunctionComponent = () => {
  const [articlesList, setArticlesList] = useState<RedditVideo[]>();

  useEffect(() => {
    const getVideos = async () => {
      const videos = await getTopWhaleVideos();
      setArticlesList(videos);
    };

    getVideos();
  }, []);

  return (
    <>
      <h1>Whale content</h1>
      {articlesList &&
        articlesList.map((article: RedditVideo) => (
          <>
            <p key={article.id}>{article.title.replace(/&amp;/g, "&")}</p>
            <p key={article.id}>{article.created}</p>
            <video
              key={article.media.reddit_video.fallback_url}
              src={article.media.reddit_video.fallback_url}
              width="320"
              height="320"
              controls
            />
          </>
        ))}
    </>
  );
};
