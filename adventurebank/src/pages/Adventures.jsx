import AdventureForm from "../components/AdventureForm";
import AdventureList from "../components/AdventureList";
import { createAdventure } from "../utils/adventure.services";
import GearList from "../components/GearTable";

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
          <AdventureForm handleSubmit={onSubmitCreateHandler} />
        </span>
      </div>
      <div>
        <GearList allGear={allGear} fetchAllGear={fetchAllGear} />
      </div>
    </>
  );
};
export default Adventures;
