import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import { Link } from "react-router-dom"

import logo from './logo_navbar.png'

function Footer(){
    return(
        
        <footer className='bg-greeny lg:h-[200px] min-[200px]:h-[400px]'>
            <div className='flex justify-center items-center align-middle min-[200px]:flex-col lg:flex-row lg:space-x-[600px]'>
                <Link to='/'>
                    <img className='h-36 mr-[550px] min-[200px]:mr-0 min-[200px]:mb-12' src={logo} alt='logo' />
                </Link>        
            <ul className='flex text-6xl space-x-8 text-white'>
                <li>
                    <FaFacebook />
                </li>
                <li>
                    <FaInstagram />
                </li>
                <li>
                    <FaLinkedin />
                </li>
            </ul>
            </div>
            <p className='flex justify-center items-center bg-white lg:h-12 lg:mt-4 mt-4 min-[200px]:mt-[100px]'>
                <span>Gustavo Noda - Tales Francisco</span> &copy; 2023
            </p>
        </footer>
  )
}


export default Footer