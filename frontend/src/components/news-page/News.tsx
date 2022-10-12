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

// interface ArticleSummary {
//   articleTitle: string;
//   articleSourceName: string;
//   articlePublishedAt: string;
//   ArticleUrl: string;
// }

export const News: React.FunctionComponent = () => {
  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = String(today.getFullYear());
    const todayDate = yyyy + "-" + mm + "-" + dd;
    const url = `https://newsapi.org/v2/everything?q=Whales&from=${todayDate}&sortBy=popularity&apiKey=08206669f0354799ae8a7553cc7dbe53`;

    // We want article.title, article.source.name, article.publishedAt article.url
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const json: NewsApiResponse = await response.json();
        const articles = json.articles;
        setArticlesList(
          articles.filter((article) =>
            article.title.toLowerCase().includes("whale")
          )
        );
        // console.log(filteredArticles);

        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>articles</h1>
      {articlesList &&
        articlesList.map((article) => <p key={article.url}>{article.title}</p>)}
    </>
  );
};
