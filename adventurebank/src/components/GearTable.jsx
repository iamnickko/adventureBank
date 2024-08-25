import GearTableRow from "./GearTableRow";
import Card from "./ui/Card";

const GearTable = ({
  allGear,
  fetchAllGear,
  selectedGear,
  setSelectedGear,
}) => {
  if (!allGear)
    return (
      <div className="text-center mx-auto w-3/5 p-5 my-5 border border-whiskey shadow-lg rounded-lg bg-whiskey/10">
        <p className="text-xl mb-3 text-whiskey font-semibold">
          You have no gear - Let's create some!
        </p>
      </div>
    );
  return (
    <>
      <Card className={"p-5"}>
        <table className="mx-auto w-full">
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
                selectedGear={selectedGear}
                setSelectedGear={setSelectedGear}
              />
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};
export default GearTable;
