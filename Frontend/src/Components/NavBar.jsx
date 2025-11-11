import React, { useState } from 'react';
import Logo from "../assets/heart.png";
import ModelsLogo from "../assets/models.png";
import Phone from "../assets/phone.png";
import home from "../assets/home.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='w-full bg-pink-100 border-b border-gray-200 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          
          <div className='flex items-center gap-2 md:gap-3'>
            <div className='w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0'>
              <img src={Logo} alt="Logo" className='w-6 h-6'/>
            </div>
            <div>
              <h2 className='text-lg md:text-xl font-bold text-gray-900'>TriCheck</h2>
              <p className='text-xs text-gray-500 hidden sm:block'>AI Medical Platform</p>
            </div>
          </div>

          <div className='hidden md:flex items-center gap-8'>
            <a href="#home" className='flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors cursor-pointer'>
              <img src={home} alt="Home" className='w-5 h-5'/>
              <span className='font-medium'>Home</span>
            </a>
            <a href="#assessment" className='flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors cursor-pointer'>
              <img src={ModelsLogo} alt="Models" className='w-5 h-5'/>
              <span className='font-medium'>Our Models</span>
            </a>
            <a href="#footer" className='flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors cursor-pointer'>
              <img src={Phone} alt="Contact" className='w-5 h-5'/>
              <span className='font-medium'>Contact</span>
            </a>
          </div>

          <div className='flex items-center gap-4'>
            <button className='hidden sm:block bg-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200'>
              <a href='#assessment'>
                Get Started
              </a>
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className='md:hidden border-t border-gray-200 py-4 space-y-3 animate-fadeIn'>
            <a href="#home" className='flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors'>
              <img src={home} alt="Home" className='w-5 h-5'/>
              <span className='font-medium'>Home</span>
            </a>
            <a href="#assessment" className='flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors'>
              <img src={ModelsLogo} alt="Models" className='w-5 h-5'/>
              <span className='font-medium'>Our Models</span>
            </a>
            <a href="#footer" className='flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors'>
              <img src={Phone} alt="Contact" className='w-5 h-5'/>
              <span className='font-medium'>Contact</span>
            </a>
            <div className='px-4 pt-2'>
              <button className='w-full bg-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all'>
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;