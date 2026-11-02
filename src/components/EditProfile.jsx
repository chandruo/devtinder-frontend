import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import http from "../utils/service";
import { addUser } from "../utils/userSlice";

const EditProfileForm = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age ?? "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await http.patch("/profile/edit", {
        firstName,
        lastName,
        age: age === "" ? null : Number(age),
        photoUrl,
      });
      dispatch(addUser(res.data.user));
      navigate("/profile");
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
        return;
      }
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      className="card card-border bg-base-100 w-96 my-4 m-auto"
      onSubmit={handleSave}
    >
      <div className="card-body flex flex-col gap-3">
        <h2 className="text-center text-xl">Edit Profile</h2>

        <label className="flex flex-col gap-1">
          <span>First Name</span>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            className="input"
            required
            maxLength={50}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span>Last Name</span>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
            className="input"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span>Age</span>
          <input
            id="age"
            type="number"
            min={18}
            placeholder="Age"
            value={age}
            className="input"
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span>Photo URL</span>
          <input
            id="photoUrl"
            type="url"
            placeholder="https://..."
            value={photoUrl}
            className="input"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </label>

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            className="btn btn-primary flex-1"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="btn btn-secondary flex-1"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

const EditProfile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return <p className="text-center my-8">Loading...</p>;
  }

  return <EditProfileForm user={user} />;
};

export default EditProfile;
