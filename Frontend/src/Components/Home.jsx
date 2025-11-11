import React from 'react'
import dataModel from '../assets/data-model.png'
import clock from '../assets/clock.png'
import target from '../assets/target.png'

const Home = () => {
  return (
    <div className='w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20'>
      
      <div className='bg-gray-200 rounded-full px-4 py-2 mb-6'>
        <p className='text-xs sm:text-sm font-semibold text-gray-700'>AI-Powered Medical Predictions</p>
      </div>

      <h1 className='text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 text-center mb-6 max-w-5xl'>
        Advanced Healthcare <span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'>Predictions</span>
      </h1>

      <div className='text-center max-w-3xl mb-12'>
        <p className='text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed'>
          Leverage cutting-edge AI technology to assess your risk for Alzheimer, 
          Brain Tumor and Heart Disease Predictions. Get accurate predictions and personalized health insights.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mb-12'>
        
        <div className='bg-white rounded-xl p-6 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow'>
          <div className='bg-pink-100 rounded-xl w-14 h-14 flex items-center justify-center mb-3'>
            <img src={target} alt="Target" className='w-8 h-8'/>
          </div>
          <p className='font-bold text-2xl text-gray-900'>80%+</p>
          <p className='text-sm text-gray-600 mt-1'>Avg accuracy Rate</p>
        </div>

        <div className='bg-white rounded-xl p-6 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow'>
          <div className='bg-pink-100 rounded-xl w-14 h-14 flex items-center justify-center mb-3'>
            <img src={clock} alt="Clock" className='w-8 h-8'/>
          </div>
          <p className='font-bold text-2xl text-gray-900'>24/7</p>
          <p className='text-sm text-gray-600 mt-1'>Available</p>
        </div>

        <div className='bg-white rounded-xl p-6 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow'>
          <div className='bg-pink-100 rounded-xl w-14 h-14 flex items-center justify-center mb-3'>
            <img src={dataModel} alt="Data model" className='w-8 h-8'/>
          </div>
          <p className='font-bold text-2xl text-gray-900'>70k+</p>
          <p className='text-sm text-gray-600 mt-1'>Patients Data</p>
        </div>

      </div>

      <button className='bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-lg font-medium text-base sm:text-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2'>
        <a href='#assessment'>
          Start Assessment
        </a>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  )
}

export default Home