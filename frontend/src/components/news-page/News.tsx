import React, { useState, useEffect } from "react";

interface RedditApiResponse {
  data: ApiData;
}

interface ApiData {
  children: ChildrenElement[];
}

interface ChildrenElement {
  data: ParentListData;
}

interface ParentListData {
  created: number;
  title: string;
  id: string;
  media: MediaData;
  is_video: boolean;
}

interface ParentListDataNew {
  created: Date;
  title: string;
  id: string;
  media: MediaData;
  is_video: boolean;
}

interface MediaData {
  reddit_video: VideoUrl;
}

interface VideoUrl {
  fallback_url: string;
}

export const News: React.FunctionComponent = () => {
  const [articlesList, setArticlesList] = useState<any[]>([]);

  useEffect(() => {
    const url = "https://www.reddit.com/r/whales/top.json?limit=50&t=month";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json: RedditApiResponse = await response.json();
        const articles: ChildrenElement[] = json.data.children;
        const arr: any = articles.filter(
          (article: ChildrenElement) => article.data.is_video
        );

        arr.forEach(
          (item: any) =>
            (item.data.created = new Date(item.data.created * 1000).toString())
        );

        setArticlesList(arr);
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
        articlesList.map((article: ChildrenElement) => (
          <>
            <p key={article.data.id}>
              {article.data.title.replace(/&amp;/g, "&")}
            </p>
            <p key={article.data.id}>{article.data.created}</p>
            <video
              key={article.data.media.reddit_video.fallback_url}
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
