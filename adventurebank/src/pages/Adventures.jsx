import AdventureForm from "../components/AdventureForm";
import AdventureList from "../components/AdventureList";
import { createAdventure } from "../utils/adventure.services";
import GearList from "../components/GearTable";
import { Link } from "react-router-dom";

const Adventures = ({
  allGear,
  allAdventures,
  fetchAllAdventures,
  fetchAllGear,
}) => {
  const onSubmitCreateHandler = async (formObject) => {
    await createAdventure(formObject);
    await fetchAllAdventures();
  };

  return (
    <>
      <h2 className="text-5xl pb-6 pt-4 text-center">Your Adventures</h2>
      <br />
      <br />
      <div className="lg:grid lg:grid-cols-3 lg:gap-3">
        <span className="lg:col-span-2">
          <AdventureList
            allAdventures={allAdventures}
            fetchAllAdventures={fetchAllAdventures}
          />
        </span>
        <span>
          {/* <AdventureForm handleSubmit={onSubmitCreateHandler} /> */}
        </span>
        <span>
          <Link to="/adventures/new">
            <button
              className="mx-auto w-2/5 py-2 border-2 border-lime-400
              bg-lime-200/50 rounded-full hover:bg-lime-400/50
              active:bg-lime-600/50 focus:outline-none focus:ring
              focus:ring-lime-300 disabled:bg-slate-50 disabled:text-slate-500
              disabled:border-slate-200 disabled:shadow-none
              disabled:cursor-not-allowed"
            >
              Create New Adventure
            </button>
          </Link>
        </span>
      </div>
    </>
  );
};
export default Adventures;
