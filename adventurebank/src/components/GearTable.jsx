import { deleteGear } from "../utils/gear.services";
import GearTableRow from "./GearTableRow";
import Card from "./ui/Card";
import { useNavigate } from "react-router-dom";

const GearList = ({ allGear, fetchAllGear, mode }) => {
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
              <GearTableRow gear={gear} mode={mode} />
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};
export default GearList;

// <article key={gear._id} className="flex justify-between items-center">
//   <span>
//     <header>
//       <h3 className="text-lg font-semibold">{gear.name}</h3>
//     </header>
//     <p className="text-gray-500 py-1 uppercase text-sm font-semibold">
//       {gear.category}
//     </p>
//     <p className="text-gray-700">{gear.description}</p>
//   </span>
//   <span className="sm:flex sm:justify-center gap-3">
//     {/* <button>Edit</button> */}
//     <button
//       onClick={async () => {
//         await deleteGear(gear._id);
//         await fetchAllGear();
//         navigate("/gear");
//       }}
//       className="w-full border-2 p-2 border-red-400 bg-red-200/50 rounded-xl hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
//     >
//       Delete
//     </button>
//   </span>
// </article>
// ))}
