import { useEffect } from "react";
import http from "../utils/service";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log(feed)

  const fetchFeed = async () => {
    const res = await http.get("/user/feed");
    const feed = res.data.users;

    dispatch(addFeed(feed));
  };

  useEffect(() => {
    if (feed.length) return;
    fetchFeed();
  }, []);
  if(feed.length === 0) return (<h2>No feed found</h2>)
  return (
    <div className="flex flex-col items-center m-3">
      <UserCard key={feed[0]._id} feed={feed[0]} />
    </div>
  );
};

export default Feed;
