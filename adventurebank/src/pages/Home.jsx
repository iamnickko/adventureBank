import { Link } from "react-router-dom";

const Home = ({ hasCookie }) => {
  return (
    <div className="text-center">
      <h1 className="text-5xl pb-6 pt-4">AdventureBank</h1>
      <br />
      <h2 className="text-xl pb-6">
        A virtual inventory of your gear at the ready for planning your next
        adventure
      </h2>
      <br />
      <div className="grid md:grid-cols-2 gap-5 justify-items-center items-center">
        <span>
          <img
            className="h-96 rounded-lg drop-shadow-lg"
            src="/tidyStorage.png"
            alt="well organised gear"
          />
          <br />
          <p>Organise your gear online like this...</p>
        </span>
        <span>
          <img
            className="h-96 rounded-lg drop-shadow-lg"
            src="/tidyGear.JPG"
            alt="well organised gear"
          />
          <br />
          <p>...so it's easy to pack like this!</p>
        </span>
      </div>
      <br />
      <hr className="border-b-2 my-5 border-whiskey/50" />
      {!hasCookie && (
        <>
          <h3 className="text-3xl pt-5">Get Started</h3>
          <br />
          <br />
          <span className="flex justify-center gap-10">
            <Link
              to={"/auth?mode=register"}
              className="w-1/3 py-2 border-2 border-lime-400 bg-lime-200/50 rounded-full hover:bg-lime-400/50 active:bg-lime-600/50 focus:outline-none focus:ring focus:ring-lime-300"
            >
              Register
            </Link>
            <Link
              to={"/auth?mode=login"}
              className="w-1/3 py-2 border-2 border-lime-400 bg-lime-200/50 rounded-full hover:bg-lime-400/50 active:bg-lime-600/50 focus:outline-none focus:ring focus:ring-lime-300"
            >
              Login
            </Link>
          </span>
        </>
      )}
    </div>
  );
};
export default Home;
