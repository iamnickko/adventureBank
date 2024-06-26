import { useEffect, useState } from "react";
import { getAllUsers } from "../utils/admin.services";

const Admin = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const data = await getAllUsers();
      setAllUsers(data);
      setIsLoading(false);
    };
    fetchAllUsers();
  }, []);

  return (
    <>
      {isLoading && <p>Loading data...</p>}
      {allUsers.map((user) => (
        <div key={user._id}>
          <p>{user.username}</p>
        </div>
      ))}
    </>
  );
};
export default Admin;
