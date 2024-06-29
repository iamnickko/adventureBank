import { useState } from "react";

const AdventureForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="mt-8 max-w-md mx-auto">
      <form className="grid grid-cols-1 gap-6 mb-5">
        <label htmlFor="name" className="block">
          <span className="text-gray-700">Name Your Adventure</span>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="e.g. One can simply walk into Mordor"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label htmlFor="description" className="block">
          <span className="text-gray-700">Description</span>
          <textarea
            name="description"
            id="description"
            rows="10"
            placeholder="Add some details to your adventure..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </label>
        <button className="mx-auto w-1/3 py-2 border-2 border-lime-400 bg-lime-200/50 rounded-full hover:bg-lime-400/50 active:bg-lime-600/50 focus:outline-none focus:ring focus:ring-lime-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed">
          Create Adventure
        </button>
      </form>
    </div>
  );
};
export default AdventureForm;
