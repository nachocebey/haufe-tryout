import { useRouteError } from "react-router-dom";
import NotFoundImage from "../../assets/images/not-found.png";
import "./ErrorPage.scss";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div className="content">
        <div className="image-container">
          <img src={NotFoundImage} alt="Not found image" loading="lazy"/>
        </div>
        <div>
          <h1>Squanch 404</h1>
          <p>Sorry, this page is not found</p>
          <p>Nothing to squanch around here...</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </div>
    </div>
  );
}
