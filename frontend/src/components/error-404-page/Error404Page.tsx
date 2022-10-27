import { Link } from "react-router-dom";
import "./Error404Page.scss";

export const Error404Page: React.FunctionComponent = () => (
  <>
    <h1>404: Page not found!</h1>
    <p>
      <Link className="back-to-home-button" to="/">
        Back to home
      </Link>
    </p>
    <img
      className="error-404-image"
      src="/WhaleSpotting_404.png"
      alt="Error 404: Page not found"
    />
  </>
);
