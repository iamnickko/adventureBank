import { useEffect, useState } from "react";

import AdventureForm from "../components/AdventureForm";
import AdventureList from "../components/AdventureList";
import { createAdventure } from "../utils/adventure.services";
import { getAllAdventures } from "../utils/adventure.services";

const Adventures = ({ hasCookie }) => {
  const [allAdventures, setAllAdventures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllAdventures = async () => {
    const data = await getAllAdventures();
    setAllAdventures(data);
    setIsLoading(false);
  };

  const onSubmitCreateHandler = async (name, description) => {
    await createAdventure({ name, description });
    await fetchAllAdventures();
  };

  useEffect(() => {
    if (hasCookie) {
      fetchAllAdventures();
    }
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
        <AdventureForm onSubmitCreate={onSubmitCreateHandler} />
      </span>
    </div>
  );
};
export default Adventures;
