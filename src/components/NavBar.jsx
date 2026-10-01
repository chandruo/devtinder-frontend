import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import http from "../utils/service";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dummyUrl =
    "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";
  const  firstName  = user?.firstName;
  const photoUrl = user?.photoUrl || dummyUrl;

  const handleLogout = async () => {
    try {
      const res = await http.post("/auth/logout");
      if (res.status === 200) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          <img
            className="w-12 h-12 rounded-full m-2"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc4aH3bczxFTXCjCzTX5HWw2RRfgJP_bxInMF0kdlWgw&s=10"
            alt=""
          />
        </Link>
      </div>

      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          {firstName && (
            <div className="flex items-center">
              <h2>Hi, {firstName}</h2>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-5"
              >
                <div className="w-10 rounded-full flex">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={photoUrl}
                  />
                </div>
              </div>
            </div>
          )}
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/connections" className="justify-between">
                Connections
              </Link>
            </li>
            <li>
              <Link to="/requests" className="justify-between">
                Requests
              </Link>
            </li>

            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
