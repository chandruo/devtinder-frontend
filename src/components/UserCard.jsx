import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import http from "../utils/service";

const UserCard = ({ feed }) => {
  console.log(feed)
  const dispatch = useDispatch();
  const handleAction = async (request, action) => {
    try {
      const url = `/request/send/${action}/${request._id}`;
      const res = await http.post(url);
      dispatch(removeFeed(request._id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div key={feed._id} className="card bg-base-100 w-60 shadow-sm">
      <figure>
        <img className="w-30 h-30" src={feed.photoUrl} alt="user-pic" />
      </figure>
      <div className="my-2 flex justify-center">
        <h2 className="card-title text-center">{feed.firstName}</h2>
      </div>
      <div className="flex">
        <button
          className="btn btn-primary"
          onClick={() => handleAction(feed, "interested")}
        >
          like
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleAction(feed, "ignored")}
        >
          ingore
        </button>
      </div>
    </div>
  );
};

export default UserCard;
