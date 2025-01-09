// eslint-disable-next-line react/prop-types

import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const {
    _id: userId,
    firstName,
    lastName,
    photoUrl,
    emailId,
    about,
    gender,
    age,
  } = user;
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log("Error::::::: ", error);
    }
  };
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {emailId && <p>{emailId}</p>}
          {age && gender && <p>{age + ", " + gender}</p>}
          {about && <p>{about}</p>}
          <div className="card-actions justify-end">
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("ignored", userId)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("interested", userId)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
