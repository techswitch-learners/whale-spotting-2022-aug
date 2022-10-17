import React from "react";
import { RedditVideo } from "../../clients/redditApiClient";
import { Card } from "../card/Card";

interface NewsCardProps {
  video: RedditVideo;
}

export const NewsCard: React.FC<NewsCardProps> = ({ video }) => {
  return (
    <Card title={video.title}>
      <video
        key={video.media.reddit_video.fallback_url}
        src={video.media.reddit_video.fallback_url}
        width="320"
        height="320"
        controls
      />
    </Card>
  );
};
