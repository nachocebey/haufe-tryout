import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../utils/apiService";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatStatusEmoji } from "../../utils/services";

import Spinner from "../../components/Spinner/Spinner";
import "./Details.scss";

function Details() {
  let { characterId } = useParams();
  const user = useSelector((state) => state.user);

  const headers = {
    UserId: user.id,
  };
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData", characterId],
    queryFn: () =>
      apiService("GET", `characters/${characterId}`, null, headers).then(
        (res) => res.data.data
      ),
    cacheTime: 0,
  });

  if (isPending) return <Spinner />;

  if (error) throw new Response("Not Found", { status: 404 });

  const { id, name, image, status, species, type, gender, origin, isFavorite } =
    data;

  const handleFavoriteClick = () => {
    apiService("POST", `users/${user.id}/${id}`).then(() => refetch());
  };

  return (
    <div id="details">
      <div className="image">
        <img src={image} alt="" />
      </div>
      <div className="details">
        <div className="title">
          <span className="name">{name}</span>
          <svg
            id="favorite"
            onClick={() => handleFavoriteClick(!isFavorite)}
            className={isFavorite ? "favorite" : ""}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            title="click to add to favorites"
          >
            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
          </svg>
        </div>
        <div className="details-container">
          <p>
            Status: <span>{`${status} - ${formatStatusEmoji(status)}`}</span>
          </p>
          <p>
            Species:<span> {species || "Unknown"}</span>
          </p>
          <p>
            Type:<span>{type || "Unknown"}</span>
          </p>
          <p>
            Gender:<span>{gender || "Unknown"}</span>
          </p>
          <p>
            Origin:<span>{origin.name || "Unknown"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Details;
