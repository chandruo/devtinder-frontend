import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import http from "../utils/service";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await http.post("/auth/logout");
      if (res.status === 200) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (err) {}
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">dev tinder</a>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          {user?.photoUrl && (
            <div className="flex items-center">
              <h2>Hi, {user.firstName}</h2>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-5"
              >
                <div className="w-10 rounded-full flex">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl}
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
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
