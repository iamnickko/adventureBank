import GearForm from "../components/GearForm";
import { useEffect, useState } from "react";
import { getAllGear } from "../utils/gear.services";
import GearList from "../components/GearList";

const Gear = ({ hasCookie }) => {
  const [allGear, setAllGear] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllGear = async () => {
    const data = await getAllGear();
    setAllGear(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (hasCookie) {
      fetchAllGear();
    }
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-3">
      <span className="lg:col-span-2">
        {isLoading ? (
          <p>Loading Gear...</p>
        ) : (
          <GearList allGear={allGear} fetchAllGear={fetchAllGear} />
        )}
      </span>
      <span>
        <GearForm fetchAllGear={fetchAllGear} />
      </span>
    </div>
  );
};
export default Gear;
