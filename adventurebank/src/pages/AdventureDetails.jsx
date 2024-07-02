import { useEffect, useState } from "react";
import AdventureForm from "../components/AdventureForm";
import { getOneAdventure } from "../utils/adventure.services";
import { useParams } from "react-router-dom";

const EditAdventure = () => {
  const [adventure, setAdventure] = useState({});

  const { id } = useParams();
  useEffect(() => {
    const fetchOneAdventure = async (id) => {
      const data = await getOneAdventure(id);
      setAdventure(data);
      console.log(data);
    };
    fetchOneAdventure(id);
  }, [id]);
  return (
    <>
      <h2 className="text-center mb-5 text-3xl">Edit Your Adventure</h2>
      <AdventureForm />
    </>
  );
};
export default EditAdventure;
