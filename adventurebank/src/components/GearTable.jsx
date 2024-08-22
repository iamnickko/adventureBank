import GearTableRow from "./GearTableRow";
import Card from "./ui/Card";
import { useNavigate } from "react-router-dom";

const GearList = ({ allGear, fetchAllGear }) => {
  const navigate = useNavigate();

  return (
    <>
      {allGear.length === 0 && (
        <div className="text-center mx-auto w-3/5 p-5 my-5 border border-whiskey shadow-lg rounded-lg bg-whiskey/10">
          <p className="text-xl mb-3 text-whiskey font-semibold">
            You have no gear - Let's create some!
          </p>
        </div>
      )}
      <Card className={"p-5"}>
        <table className="">
          <thead className="text-gray-500 font-bold text-center border-b-2">
            <tr>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {allGear.map((gear) => (
              <GearTableRow
                key={gear._id}
                gear={gear}
                fetchAllGear={fetchAllGear}
              />
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};
export default GearList;
