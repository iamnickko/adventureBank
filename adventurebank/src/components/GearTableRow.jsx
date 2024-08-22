const GearTableRow = ({ gear, mode }) => {
  return (
    <tr className=" hover:bg-whiskey/5 hover:cursor-pointer" key={gear._id}>
      <td className="text-lg font-semibold px-4 py-2">{gear.name}</td>
      <td className="text-gray-500 uppercase text-sm font-semibold px-4 py-2">
        {gear.category}
      </td>
      <td className="text-gray-700 px-4 py-2">{gear.description}</td>
      {mode === "edit" ? <td>delete</td> : ""}
      {mode === "select" ? (
        <td>
          <input
            type="checkbox"
            id="gear._id"
            name="gear._id"
            value={gear._id}
          />
        </td>
      ) : (
        ""
      )}
    </tr>
  );
};
export default GearTableRow;
