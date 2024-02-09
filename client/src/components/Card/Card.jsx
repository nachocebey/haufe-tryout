import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { formatStatusEmoji } from "../../utils/services";

import "./Card.scss";

function Card({ id, name, status, image, species, origin, isFavorite }) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/details/${id}`)}>
      <div className="image">
        <img src={image} alt="" />
      </div>
      <div className="content">
        <div className="data">
          <a>
            <h2>{name}</h2>
          </a>
          <span className="status">
            {formatStatusEmoji(status)} {status} - {species}
          </span>
          <p>
            <span className="location">From: </span>
          </p>
          <p>{origin.name}</p>
        </div>
        <div className="favorite" title="favorite">
          {isFavorite ? "⭐️" : null}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  origin: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default Card;
