import React, { useState, useEffect } from "react";

export const News: React.FunctionComponent = () => {
  const [articlesList, setArticlesList] = useState<any[]>([]);

  useEffect(() => {
    const url = "https://www.reddit.com/r/whales/top.json?limit=50&t=month";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json: any = await response.json();
        const articles = json.data.children;
        setArticlesList(
          articles.filter((article: any) => article.data.is_video)
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Whale content</h1>
      {articlesList &&
        articlesList.map((article) => (
          <>
            <p key={article.data.Id}>
              {article.data.title.replace(/&amp;/g, "&")}
            </p>
            <video
              src={article.data.media.reddit_video.fallback_url}
              width="320"
              height="320"
              controls
            />
          </>
        ))}
    </>
  );
};
