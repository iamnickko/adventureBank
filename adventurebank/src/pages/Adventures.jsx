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

  const onSubmitCreateHandler = async (formObject) => {
    await createAdventure(formObject);
    await fetchAllAdventures();
  };

  useEffect(() => {
    if (hasCookie) {
      fetchAllAdventures();
    }
  }, []);

  return (
    <>
      <h2 className="text-5xl pb-6 pt-4 text-center">Your Adventures</h2>
      <br />
      <br />
      <div className="lg:grid lg:grid-cols-3 lg:gap-3">
        <span className="lg:col-span-2">
          {isLoading ? (
            <p>Loading adventures...</p>
          ) : (
            <AdventureList
              allAdventures={allAdventures}
              fetchAllAdventures={fetchAllAdventures}
            />
          )}
        </span>
        <span>
          <AdventureForm handleSubmit={onSubmitCreateHandler} />
        </span>
      </div>
    </>
  );
};
export default Adventures;
