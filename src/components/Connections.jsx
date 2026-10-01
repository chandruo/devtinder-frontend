import { useEffect } from "react";
import http from "../utils/service";
import { addConnection } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      const res = await http.get("/user/connections");
      const connections = res.data.data;
      dispatch(addConnection(connections));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No connections found</h1>;

  return (
    <div className="m-2 ">
      <h2 className="text-2xl font-bold text-center">Connections</h2>
      <div className="flex items-center flex-col my-3">
        {connections.map((connection) => {
          const { firstName, photoUrl } = connection;
          return (
            <div key={connection._id} className="border  m-2">
              <img src={photoUrl} className="w-30 h-30 " alt="user-img"></img>
              <h1 className="text-center text-xl py-1">{firstName}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
