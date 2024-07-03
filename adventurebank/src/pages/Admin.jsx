import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../utils/admin.services";
import Card from "../components/ui/Card";

const Admin = ({ isAdmin }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const data = await getAllUsers();
      setAllUsers(data);
      setIsLoading(false);
    };
    if (!isAdmin) return;
    fetchAllUsers();
  }, [allUsers]);

  return (
    <>
      <h1 className="text-center text-5xl pb-6 pt-4">All Users</h1>
      <br />
      <br />
      {isLoading && <p>Loading data...</p>}
      {allUsers.map((user) => (
        <Card className={"p-5"} key={user._id}>
          <article className="flex justify-between items-center">
            <span>
              <p className="text-lg font-semibold">{user.username}</p>
              <p>{user.email}</p>
            </span>
            {/* <span>
              <p>#Adventures: {user.adventures.length}</p>
              <p>#Gear: {user.adventures.length}</p>
            </span> */}
            <span>
              <p>Created: {user.createdAt}</p>
              <p>Updated: {user.updatedAt}</p>
            </span>
            <span>
              <button
                className="w-full border-2 p-2 border-red-400 bg-red-200/50 rounded-xl hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                onClick={async () => {
                  await deleteUser(user._id);
                }}
                value={user._id}
              >
                Delete
              </button>
            </span>
          </article>
        </Card>
      ))}
    </>
  );
};
export default Admin;
