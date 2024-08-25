import { useEffect, useState } from "react";
import AdventureForm from "../components/AdventureForm";
import GearTable from "../components/GearTable";
import { editAdventure, getOneAdventure } from "../utils/adventure.services";
import { useNavigate, useParams } from "react-router-dom";
import { getAllGear } from "../utils/gear.services";

const AdventureDetails = ({ allGear }) => {
  const navigate = useNavigate();
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
    navigate("/adventures");
  };

  return (
    <>
      <h2 className="text-center mb-5 text-3xl">Edit Your Adventure</h2>
      <AdventureForm
        adventureData={adventure}
        allGear={allGear}
        handleSubmit={onSubmitEdit}
        mode={"Edit"}
      />
    </>
  );
};
export default AdventureDetails;
