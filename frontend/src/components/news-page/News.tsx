import React, { useState, useEffect } from "react";

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

interface Article {
  title: string;
  author: string;
  source: Source;
  publishedAt: string;
  url: string;
}

interface Source {
  Id: string;
  Name: string;
}

export const News: React.FunctionComponent = () => {
  const [articlesList, setArticlesList] = useState<any[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const url = "https://www.reddit.com/r/whales/top.json?limit=50&t=month";

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const json: any = await response.json();
        const articles = json.data.children;
        setArticlesList(
          articles.filter((article: any) => article.data.is_video)
        );
        setIsLoading(false);
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
            <p key={article.data.Id}>{article.data.title}</p>
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
