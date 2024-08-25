import { useEffect, useState } from "react";

import Card from "../components/ui/Card";
import {
  isDescriptionValid,
  isNameInputValid,
} from "../utils/validation.services";
import GearTable from "./GearTable";

const AdventureForm = ({ handleSubmit, adventureData, mode, allGear }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGear, setSelectedGear] = useState([]);
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const [formError, setFormError] = useState({ name: "", description: "" });
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (adventureData) {
      setName(adventureData.name);
      setDescription(adventureData.description);
      setSelectedGear(adventureData.gearItems || []);
    }
  }, [adventureData]);

  useEffect(() => {
    if (name && description) {
      setBtnIsDisabled(false);
    } else {
      setBtnIsDisabled(true);
    }
    setFormError({});
    setSubmitError("");
  }, [name, description]);

  const validateName = () => {
    const nameValid = isNameInputValid(name);
    setFormError((prevErrors) => ({
      ...prevErrors,
      name: nameValid
        ? ""
        : "Please use only alphanumeric characters and !-@./#&+",
    }));
  };

  const validateDescription = () => {
    const descriptionValid = isDescriptionValid(description);
    setFormError((prevErrors) => ({
      ...prevErrors,
      description: descriptionValid
        ? ""
        : "Please use only alphanumeric characters and !-@./#&+",
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit({
        ...adventureData,
        name: name,
        description: description,
        gearItems: selectedGear,
      });
      setName("");
      setDescription("");
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-5">
      <form onSubmit={onSubmitHandler} className="grid grid-cols-1 gap-6 mb-5">
        <label htmlFor="name" className="block">
          <span className="text-gray-700">Name Your Adventure</span>
          <input
            type="text"
            name="name"
            id="name"
            maxLength="50"
            placeholder="e.g. One can simply walk into Mordor"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => setName(e.target.value)}
            value={name}
            onBlur={validateName}
          />
        </label>
        {formError.name && (
          <p className="text-red-700 border border-red-300 bg-red-50 text-center mx-auto rounded-xl py-2 my-2 w-full">
            {formError.name}
          </p>
        )}
        <label htmlFor="description" className="block">
          <span className="text-gray-700">Description</span>
          <textarea
            name="description"
            id="description"
            rows="10"
            maxLength="400"
            placeholder="Add some details to your adventure..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            onBlur={validateDescription}
          />
        </label>
        <GearTable
          allGear={allGear}
          selectedGear={selectedGear}
          setSelectedGear={setSelectedGear}
        />
        {formError.description && (
          <p className="text-red-700 border border-red-300 bg-red-50 text-center mx-auto rounded-xl py-2 my-2 w-full">
            {formError.description}
          </p>
        )}
        <button
          disabled={btnIsDisabled}
          className="mx-auto w-2/5 py-2 border-2 border-lime-400 bg-lime-200/50 rounded-full hover:bg-lime-400/50 active:bg-lime-600/50 focus:outline-none focus:ring focus:ring-lime-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed"
        >
          {mode === "Edit" ? "Edit" : "Create"} Adventure
        </button>
        {submitError && (
          <p className="text-red-700 border border-red-300 bg-red-50 text-center mx-auto rounded-xl py-2 my-2 w-full">
            {submitError}
          </p>
        )}
      </form>
    </Card>
  );
};
export default AdventureForm;
