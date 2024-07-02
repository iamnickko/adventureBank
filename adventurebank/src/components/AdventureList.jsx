import { deleteAdventure } from "../utils/adventure.services";
import Card from "../components/ui/Card";
import { useNavigate, Link } from "react-router-dom";

const AdventureList = ({ allAdventures, fetchAllAdventures }) => {
  const navigate = useNavigate();

  return (
    <>
      {allAdventures.length === 0 && (
        <p className="text-center mb-5">
          You have no adventures - Let's create one!
        </p>
      )}
      {allAdventures.map((adventure) => (
        <Card key={adventure._id}>
          <article className="flex justify-between items-center">
            <span>
              <header>
                <h3>{adventure.name}</h3>
              </header>
              <p>{adventure.description}</p>
            </span>
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
