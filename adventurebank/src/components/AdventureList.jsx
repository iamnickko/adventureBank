import { deleteAdventure } from "../utils/adventure.services";
import Card from "../components/ui/Card";

const AdventureList = ({ allAdventures }) => {
  return (
    <>
      {allAdventures.map((adventure) => (
        <Card key={adventure._id}>
          <article className="flex justify-between items-center">
            <span>
              <header>
                <h3>{adventure.name}</h3>
              </header>
              <p>{adventure.description}</p>
            </span>
            <span className="sm:flex sm:justify-center gap-3">
              <button>Edit</button>
              <button
                onClick={() => {
                  deleteAdventure(adventure._id);
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
