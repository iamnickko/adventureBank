import { deleteGear } from "../utils/gear.services";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const GearTableRow = ({ gear, fetchAllGear }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGearPage = location.pathname === "/gear";
  const { id } = useParams();
  const isAdventurePage = location.pathname === `/adventures/${id}`;

  const handleDeleteClick = async (gearId) => {
    await deleteGear(gearId);
    await fetchAllGear();
    navigate("/gear");
  };

  return (
    <tr className=" hover:bg-whiskey/5" key={gear._id}>
      <td className="text-lg font-semibold px-4 py-2">{gear.name}</td>
      <td className="text-gray-500 uppercase text-sm font-semibold px-4 py-2">
        {gear.category}
      </td>
      <td className="text-gray-700 px-4 py-2">{gear.description}</td>
      {isGearPage && (
        <td className="flex items-center gap-2 py-1">
          Edit{" "}
          <button
            onClick={() => handleDeleteClick(gear._id)}
            className="w-full border-2 p-2 border-red-400 bg-red-200/50 rounded-xl hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
          >
            Delete
          </button>
        </td>
      )}
      {isAdventurePage && (
        <td>
          <input
            type="checkbox"
            id="gear._id"
            name="gear._id"
            value={gear._id || ""}
          />
        </td>
      )}
    </tr>
  );
};

export default GearTableRow;
