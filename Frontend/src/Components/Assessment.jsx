import React, { useState } from 'react';
import axios from 'axios';
import { assessmentData } from '../Data/AssessmentData.jsx';

const AssessmentWithDetails = () => {
  const [predictions, setPredictions] = useState({
    alzheimer: { prediction: null, reason: null },
    heart: { prediction: null, reason: null },
    brain: { prediction: null, reason: null },
  });

  const [selected, setSelected] = useState('alzheimer');

  const [formData, setFormData] = useState({
    alzheimer: {},
    heart: {},
    brain: {},
  });

  const numericFields = ["age_in_yrs", "height", "weight", "ap_hi", "ap_lo"];

  const handleSubmit = async () => {
    const data = formData[selected] || {};
    console.log("🧠 Full formData for", selected, ":\n", JSON.stringify(data, null, 2));
    const BASE_URL ="https://akashaiml-tricheck-backend-repo.hf.space"
    try {
      let response;

      if (selected === 'heart') {
        response = await axios.post(
          `${BASE_URL}/predict/${selected}`,
          data,
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        const formDataObj = new FormData();
        formDataObj.append("mri_image", data.mri_image);

        response = await axios.post(
          `${BASE_URL}/predict/${selected}`,
          formDataObj,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      console.log('✅ Prediction Result:', response.data);

      setPredictions((prevState) => ({
        ...prevState,
        [selected]: response.data,
      }));
    } catch (error) {
      console.error('❌ Error sending data:', error);
      alert('Something went wrong while getting prediction!');
    }
  };

  const currentAssessment = assessmentData[selected] || {};

  return (
    <div className="w-full bg-gray-50">
      {/* Assessment Selection Section */}
      <div className="w-full bg-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Assessment</h1>
          <p className="text-gray-600 mb-12">Select a medical condition to analyze.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(assessmentData).map((assessment) => (
              <button
                key={assessment.id}
                onClick={() => setSelected(assessment.id)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  selected === assessment.id
                    ? `border-transparent bg-gradient-to-br ${assessment.gradient} text-white shadow-xl scale-105`
                    : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-lg'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
                    selected === assessment.id ? 'bg-white/20' : 'bg-gray-100'
                  }`}
                >
                  <img src={assessment.icon} alt={assessment.title} className="w-10 h-10" />
                </div>

                <h3
                  className={`text-xl font-bold mb-1 ${
                    selected === assessment.id ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {assessment.title}
                </h3>
                <p
                  className={`text-sm ${
                    selected === assessment.id ? 'text-white/90' : 'text-gray-600'
                  }`}
                >
                  {assessment.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prediction Form Section */}
      <div className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {currentAssessment.formFields && (
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-2">{currentAssessment.title} Assessment</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below to get your personalized prediction.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-6"
              >
                {currentAssessment.formFields.map((field, index) => (
                  <div key={index} className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>

                    {field.type === 'select' ? (
                      <select
                        required
                        name={field.name}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setFormData((prev) => ({
                            ...prev,
                            [selected]: {
                              ...prev[selected],
                              [name]: value,
                            },
                          }));
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
                      >
                        <option value="">Select {field.label.toLowerCase()}</option>
                        {field.options.map((option, i) => (
                          <option key={i} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        required
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        onChange={(e) => {
                          const { name, value, type, files } = e.target;
                          setFormData((prev) => ({
                            ...prev,
                            [selected]: {
                              ...prev[selected],
                              [name]:
                                type === "file"
                                  ? files[0]
                                  : numericFields.includes(name)
                                  ? Number(value)
                                  : value,
                            },
                          }));
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
                      />
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r ${currentAssessment.gradient} text-white py-4 rounded-lg font-medium text-lg hover:shadow-xl transition`}
                >
                  Get {currentAssessment.title} Prediction
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Display Prediction */}
      {predictions[selected]?.prediction && (
        <div className="max-w-3xl mx-auto mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Prediction Result</h3>
          <div className={`bg-gradient-to-r ${currentAssessment.gradient || 'from-pink-400 to-pink-600'} text-white text-lg font-semibold rounded-xl px-5 py-3 inline-block mb-3`}>
            {predictions[selected].prediction}
          </div>
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">Reason:</span>{' '}
            {predictions[selected].reason || 'The model generated this result based on your inputs.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AssessmentWithDetails;
