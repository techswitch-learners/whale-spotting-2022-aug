interface RedditApiResponse {
  data: RedditApiDataResponse;
}

interface RedditApiDataResponse {
  children: RedditVideoResponse[];
}

interface RedditVideoResponse {
  data: RedditVideoDataResponse;
}

interface RedditVideoDataResponse {
  created: number;
  title: string;
  id: string;
  media: MediaData;
  is_video: boolean;
}

export interface RedditVideo {
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

export const getTopWhaleVideos = async (): Promise<RedditVideo[]> => {
  const url = "https://www.reddit.com/r/whales/top.json?limit=50&t=month";
  const response = await fetch(url);
  const json: RedditApiResponse = await response.json();
  const articles: RedditVideoResponse[] = json.data.children;
  const arr: RedditVideoResponse[] = articles.filter(
    (article: RedditVideoResponse) => article.data.is_video
  );

  const newArray: RedditVideo[] = arr.map((item: RedditVideoResponse) => ({
    ...item.data,
    created: new Date(item.data.created * 1000),
  }));

  return newArray;
};
