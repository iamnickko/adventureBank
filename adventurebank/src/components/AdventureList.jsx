import { deleteAdventure } from "../utils/adventure.services";
import Card from "../components/ui/Card";
import { useNavigate, Link } from "react-router-dom";

const AdventureList = ({ allAdventures, fetchAllAdventures }) => {
  const navigate = useNavigate();

  return (
    <>
      {allAdventures.length === 0 && (
        <div className="text-center mx-auto w-3/5 p-5 my-5 border border-whiskey shadow-lg rounded-lg bg-whiskey/10">
          <p className="text-xl mb-3 text-whiskey font-semibold">
            You have no adventures - Let's create one!
          </p>
        </div>
      )}
      {allAdventures.map((adventure) => (
        <Card className={"p-5"} key={adventure._id}>
          <article className="flex justify-between items-center">
            <span>
              <header>
                <h3 className="text-lg font-semibold">{adventure.name}</h3>
              </header>
              <p className="text-gray-700">{adventure.description}</p>
            </span>
            {/* <p>{adventure.gearItems[0].name}</p> */}
            <span className="sm:flex sm:justify-center gap-3 items-center">
              <Link to={`/adventures/${adventure._id}`}>Edit</Link>
              <button
                onClick={async () => {
                  await deleteAdventure(adventure._id);
                  await fetchAllAdventures();
                  navigate("/adventures");
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
export default AdventureList;
