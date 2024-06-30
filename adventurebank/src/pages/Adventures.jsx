import { useEffect, useState } from "react";

import AdventureForm from "../components/AdventureForm";
import AdventureList from "../components/AdventureList";
import { getAllAdventures } from "../utils/adventure.services";

const Adventures = () => {
  const [allAdventures, setAllAdventures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllAdventures = async () => {
    const data = await getAllAdventures();
    setAllAdventures(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllAdventures();
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-3">
      <span className="lg:col-span-2">
        {isLoading ? (
          <p>Loading adventures</p>
        ) : (
          <AdventureList
            allAdventures={allAdventures}
            fetchAllAdventures={fetchAllAdventures}
          />
        )}
      </span>
      <span>
        <AdventureForm fetchAllAdventures={fetchAllAdventures} />
      </span>
    </div>
  );
};
export default Adventures;
