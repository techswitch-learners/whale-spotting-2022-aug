import React from "react";
import { RedditVideo } from "../../clients/redditApiClient";
import { Card } from "../card/Card";
import "./VideoCard.scss";

interface VideoCardProps {
  video: RedditVideo;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Card title={video.title}>
      <div>
        <video
          className="reddit-whale-video"
          src={video.media.reddit_video.fallback_url}
          controls
        />
      </div>
    </Card>
  );
};
