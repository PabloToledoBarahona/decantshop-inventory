import FiMenu from 'react-icons/fi/FI';
import FiX from 'react-icons/fi/FiX';
import FiList from 'react-icons/fi/FiList';
import FiPlusCircle from 'react-icons/fi/FiPlusCircle';
import FiPackage from 'react-icons/fi/FiPackage';
import FiUserPlus from 'react-icons/fi/FiUserPlus';
import FiShuffle from 'react-icons/fi/FiShuffle';

const Navbar = ({ setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false); // Cierra el menú al seleccionar una opción
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => handleNavigation('home')}
          className="text-white text-2xl font-semibold tracking-wide hover:text-gray-400 transition-all duration-300 cursor-pointer"
        >
          DecantShop
        </div>

        {/* Botón hamburguesa */}
        <button
          className="text-white text-3xl lg:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Menú de navegación */}
        <ul
          className={`lg:flex lg:space-x-8 text-gray-300 text-lg lg:static absolute top-full left-0 w-full bg-gray-800 lg:bg-transparent lg:w-auto ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <button
              onClick={() => handleNavigation('list')}
              className="flex items-center gap-2 block w-full py-2 px-4 text-left hover:text-white transition-all duration-300"
            >
              <FiList />
              Perfumes
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('decants')}
              className="flex items-center gap-2 block w-full py-2 px-4 text-left hover:text-white transition-all duration-300"
            >
              <FiPackage />
              Decants
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('add')}
              className="flex items-center gap-2 block w-full py-2 px-4 text-left hover:text-white transition-all duration-300"
            >
              <FiPlusCircle />
              Perfume
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('addDecant')}
              className="flex items-center gap-2 block w-full py-2 px-4 text-left hover:text-white transition-all duration-300"
            >
              <FiUserPlus />
              Decant
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('transfers')}
              className="flex items-center gap-2 block w-full py-2 px-4 text-left hover:text-white transition-all duration-300"
            >
              <FiShuffle />
              Transferencias
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;