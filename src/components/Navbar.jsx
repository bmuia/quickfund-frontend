import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-6xl mx-auto flex justify-between px-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">QuickFund</Link>
        <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;
