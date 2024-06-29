import AdventureForm from "../components/AdventureForm";
import AdventureList from "../components/AdventureList";

const Adventures = () => {
  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-3">
      <span className="lg:col-span-2">
        <AdventureList />
      </span>
      <span>
        <AdventureForm />
      </span>
    </div>
  );
};
export default Adventures;
