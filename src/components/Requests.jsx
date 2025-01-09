import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();

  const requests = useSelector((store) => store.requests);

  const getConnections = async () => {
    if (requests) return;
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log("res---------------", res);

      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const reviewRequests = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(userId));
    } catch (error) {
      console.log("Error::::::: ", error.message);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!requests || requests.length === 0)
    return (
      <h1 className="text-center text-2xl font-bold my-4">No requests found</h1>
    );
  return (
    <div className="text-center my-10">
      <h1 className=" text-3xl font-bold text-white my-4">
        {" "}
        Connetion Requests
      </h1>
      {requests.map((request) => {
        const { _id, photoUrl, firstName, lastName, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 bg-base-300 rounded-lg w-full mx-auto"
          >
            <div>
              <img src={photoUrl} alt="" className=" w-20 h-20 rounded-full" />
            </div>
            <div className=" text-left mx-4">
              <h2 className=" font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{about}</p>
              {age && gender && <p>{age + ", " + gender}</p>}
            </div>
            <div className="">
              <button
                className="btn btn-outline btn-primary mx-3 w-24"
                onClick={() => reviewRequests("rejected", request?._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-outline btn-secondary mx-3 w-24"
                onClick={() => reviewRequests("accepted", request?._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
