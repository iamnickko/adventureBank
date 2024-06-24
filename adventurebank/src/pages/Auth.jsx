const Auth = () => {
  return (
    <>
      <h1 className="text-3xl text-center">Auth page with form</h1>
      <div className="mt-8 max-w-md mx-auto">
        <form action="" className="grid grid-cols-1 gap-6">
          <label htmlFor="name" className="block">
            <span className="text-gray-700">Username</span>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="e.g. hikingChamp1337"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label htmlFor="email" className="block">
            <span className="text-gray-700">Username</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email@domain.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label htmlFor="password" className="block">
            <span>Password</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};
export default Auth;
