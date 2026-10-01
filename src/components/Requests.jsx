
import { useEffect } from "react";
import http from "../utils/service";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await http.get("user/requests/received");
      const requests = res.data;
      dispatch(addRequest(requests));
    } catch (err) {
      console.log(err)
    }
  };

  const handleAction = async (request, action) => {
    try {
      const url = `/request/review/${action}/${request._id}`;
      console.log(url, request);
       await http.post(url);
      dispatch(removeRequest(request._id));
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="my-4 text-center text-2xl font-bold">No Requests found</h1>
    );

  return (
    <div className="m-2 ">
      <h2 className="text-2xl font-bold text-center">Connections</h2>
      <div className="flex items-center flex-col my-3">
        {requests.map((request) => {
          const { firstName, photoUrl } = request.fromUserId;
          return (
            <div key={request._id} className="border  m-2">
              <div className="card bg-base-100 shadow-sm">
                <figure>
                  <img
                    src={photoUrl}
                    className="w-50 h-50"
                    alt="request-user"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="text-xl text-center">{firstName}</h2>
                  <div className="card-actions justify-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAction(request, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleAction(request, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
