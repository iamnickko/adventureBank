import GearForm from "../components/GearForm";
import { useEffect, useState } from "react";
import { getAllGear, createGear } from "../utils/gear.services";
import GearList from "../components/GearList";

const Gear = ({ allGear, fetchAllGear }) => {
  // const [allGear, setAllGear] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const fetchAllGear = async () => {
  //   const data = await getAllGear();
  //   setAllGear(data);
  //   setIsLoading(false);
  // };

  const onSubmitCreateHandler = async (name, category, description) => {
    await createGear({ name, category, description });
    await fetchAllGear();
  };

  // useEffect(() => {
  //   if (hasCookie) {
  //     fetchAllGear();
  //   }
  // }, []);

  return (
    <>
      <h2 className="text-5xl pb-6 pt-4 text-center">Your Gear</h2>
      <br />
      <br />
      <div className="lg:grid lg:grid-cols-3 lg:gap-3">
        <span className="lg:col-span-2">
          {/* {isLoading ? (
            <p>Loading Gear...</p>
          ) : ( */}
          <GearList allGear={allGear} fetchAllGear={fetchAllGear} />
          {/* )} */}
        </span>
        <span>
          <GearForm onSubmitCreate={onSubmitCreateHandler} />
        </span>
      </div>
    </>
  );
};
export default Gear;
