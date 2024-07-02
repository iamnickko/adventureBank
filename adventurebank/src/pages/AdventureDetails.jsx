import { useEffect, useState } from "react";
import AdventureForm from "../components/AdventureForm";
import { editAdventure, getOneAdventure } from "../utils/adventure.services";
import { useParams } from "react-router-dom";

const AdventureDetails = () => {
  const [adventure, setAdventure] = useState({});

  const { id } = useParams();
  useEffect(() => {
    const fetchOneAdventure = async (id) => {
      const data = await getOneAdventure(id);
      setAdventure(data);
    };
    fetchOneAdventure(id);
  }, [id]);

  const onSubmitEdit = async (formObject) => {
    await editAdventure(formObject);
  };

  return (
    <>
      <h2 className="text-center mb-5 text-3xl">Edit Your Adventure</h2>
      <AdventureForm
        adventureData={adventure}
        handleSubmit={onSubmitEdit}
        mode={"Edit"}
      />
    </>
  );
};
export default AdventureDetails;
