import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return <p className="text-center my-8">Loading...</p>;
  }

  return (
    <div className="card card-border bg-base-100 w-96 my-4 m-auto">
      <div className="card-body flex flex-col items-center gap-3">
        <img
          className="w-24 h-24 rounded-full"
          src={user.photoUrl || undefined}
          alt="profile"
        />
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>
        {user.age && <p>Age: {user.age}</p>}
        <Link to="/profile/edit" className="btn btn-primary">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
