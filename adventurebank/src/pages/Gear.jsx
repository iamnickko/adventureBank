import GearForm from "../components/GearForm";
import { createGear } from "../utils/gear.services";
import GearTable from "../components/GearTable";

const Gear = ({ allGear, fetchAllGear }) => {
  const onSubmitCreateHandler = async (name, category, description) => {
    await createGear({ name, category, description });
    await fetchAllGear();
  };

  return (
    <>
      <h2 className="text-5xl pb-6 pt-4 text-center">Your Gear</h2>
      <br />
      <br />
      <div className="lg:grid lg:grid-cols-3 lg:gap-3">
        <span className="lg:col-span-2">
          <GearTable allGear={allGear} fetchAllGear={fetchAllGear} />
        </span>
        <span>
          <GearForm onSubmitCreate={onSubmitCreateHandler} />
        </span>
      </div>
    </>
  );
};
export default Gear;
