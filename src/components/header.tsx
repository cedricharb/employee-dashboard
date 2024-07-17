import { Link } from "react-router-dom";

// This is the header for extra navigation capabilities such as add employee or return to home page

const Header: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            Employee Dashboard
          </Link>
          <div>
            <Link to="/" className="text-gray-300 hover:text-white mx-2">
              Home
            </Link>
            <Link to="/add" className="text-gray-300 hover:text-white mx-2">
              Add Employee
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
