import { deleteGear } from "../utils/gear.services";
import Card from "../components/ui/Card";
import { useNavigate } from "react-router-dom";

const GearList = ({ allGear, fetchAllGear }) => {
  const navigate = useNavigate();

  return (
    <>
      {allGear.length === 0 && (
        <p className="text-center mb-5">
          You have no gear - Let's create some!
        </p>
      )}
      {allGear.map((gear) => (
        <Card key={gear._id}>
          <article className="flex justify-between items-center">
            <span>
              <header>
                <h3>{gear.name}</h3>
              </header>
              <p>{gear.category}</p>
              <p>{gear.description}</p>
            </span>
            <span className="sm:flex sm:justify-center gap-3">
              {/* <button>Edit</button> */}
              <button
                onClick={async () => {
                  await deleteGear(gear._id);
                  await fetchAllGear();
                  navigate("/gear");
                }}
                className="w-full border-2 p-2 border-red-400 bg-red-200/50 rounded-xl hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
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
export default GearList;
