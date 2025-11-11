import React from 'react'
import Logo from "../assets/heart.png"

const Footer = () => {
  return (
    <footer className='w-full bg-gray-900 text-white'>
      
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12'>
          
          <div className='lg:col-span-1'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center'>
                <img src={Logo} alt="Logo" className='w-6 h-6'/>
              </div>
              <h3 className='text-xl font-bold'>TriCheck</h3>
            </div>
            <p className='text-gray-400 text-sm leading-relaxed mb-4'>
              Advanced AI-powered medical predictions for better health outcomes. 
              Empowering early detection and preventive care.
            </p>
          </div>

          <div>
            <h4 className='text-white font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-3'>
              <li>
                <a href="#home" className='text-gray-400 hover:text-pink-500 transition-colors text-sm'>Home</a>
              </li>
              <li>
                <a href="#assessment" className='text-gray-400 hover:text-pink-500 transition-colors text-sm'>Our Models</a>
              </li>
              <li>
                <a href="#contact" className='text-gray-400 hover:text-pink-500 transition-colors text-sm'>Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-white font-semibold mb-4'>Assessments</h4>
            <ul className='space-y-3 mb-6'>
              <li>
                <a href="#alzheimers" className='text-gray-400 hover:text-pink-500 transition-colors text-sm'>Alzheimer's Disease</a>
              </li>
              <li>
                <a href="#parkinsons" className='text-gray-400 hover:text-pink-500 transition-colors text-sm'>Parkinson's Disease</a>
              </li>
              <li>
                <a href="#heart" className='text-gray-400 hover:text-pink-500 transition-colors text-sm'>Heart Disease</a>
              </li>
            </ul>

            <div className='bg-gray-800 rounded-lg p-4'>
              <p className='text-xs text-gray-400 mb-2'>Need help? <span className='text-sm text-white'>Contact</span></p>
              <a href="mailto:akashpreiyan97@gmail.com" className='text-pink-500 hover:text-pink-400 text-sm font-medium break-all'>
                akashpreiyan97@gmail.com
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className='border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <p className='text-gray-400 text-sm text-center'>
            © 2025 TriCheck. All rights reserved.
          </p>
        </div>
      </div>

      <div className='bg-gray-950 py-3'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <p className='text-gray-500 text-xs text-center'>
            <span className='text-yellow-500'>⚠️</span> Medical Disclaimer: This platform provides AI-powered predictions for informational purposes only 
            and should not replace professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>

    </footer>
  )
}

export default Footer