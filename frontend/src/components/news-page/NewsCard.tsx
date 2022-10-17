import React from "react";
import { RedditVideo } from "../../clients/redditApiClient";
import { Card } from "../card/Card";
import "./NewsCard.scss";

interface NewsCardProps {
  video: RedditVideo;
}

export const NewsCard: React.FC<NewsCardProps> = ({ video }) => {
  return (
    <Card title={video.title}>
      <div className="video-container">
        <video
          key={video.media.reddit_video.fallback_url}
          src={video.media.reddit_video.fallback_url}
          controls
        />
      </div>
    </Card>
  );
};
