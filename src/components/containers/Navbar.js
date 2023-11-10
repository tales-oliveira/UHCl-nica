import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FaBars, FaTimes } from 'react-icons/fa';

import logo from './logo_navbar.png';

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1200 });

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="bg-greeny fixed w-screen flex justify-center items-center space-x-56 z-20 mb-5">
      {isDesktop ? (
        <div className="flex justify-center items-center space-x-96">
          <Link to="/">
            <img className="ml-4" src={logo} alt="logo" />
          </Link>
          <ul className="flex space-x-4 text-white text-xl md:text-2xl">
            <li>
              <Link to="/">INÍCIO</Link>
            </li>
            <li>
              <Link to="/sobrenos">SOBRE NÓS</Link>
            </li>
            <li>
              <Link to="/login">ENTRAR</Link>
            </li>
            <li>
              <Link to="/cadastro">CADASTRAR</Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Link to="/">
            <img className="ml-4" src={logo} alt="logo" />
          </Link>
          {showMenu && (
            <ul className="mt-2 bg-greeny text-white text-xl md:text-2xl rounded-lg p-4 min-[200px]:text-2xl">
              <li>
                <Link to="/">INÍCIO</Link>
              </li>
              <li>
                <Link to="/sobrenos">SOBRE NÓS</Link>
              </li>
              <li>
                <Link to="/login">ENTRAR</Link>
              </li>
              <li>
                <Link to="/cadastro">CADASTRAR</Link>
              </li>
            </ul>
          )}
          <div className="relative mt-2">
            {showMenu ? (
              <FaTimes className="text-white text-2xl md:text-3xl cursor-pointer min-[200px]:text-4xl min-[200px]:mb-10" onClick={toggleMenu} />
            ) : (
              <FaBars className="text-white text-2xl md:text-3xl cursor-pointer min-[200px]:text-6xl" onClick={toggleMenu} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
