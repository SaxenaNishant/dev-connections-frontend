import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log("res---------------", res);

      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections || connections.length === 0)
    return <h1 className="text-3xl text-center my-10">No connections found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className=" text-3xl font-bold text-white my-4">Connections</h1>
      {connections.map((connection) => {
        const { _id, photoUrl, firstName, lastName, age, gender, about } =
          connection;
        return (
          <div
            key={_id}
            className=" flex m-4 p-4 bg-base-300 rounded-lg w-1/2 mx-auto"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
