import brain from '../assets/brainstorm.png'
import heart from '../assets/heartIcon.png'


export  const assessmentData = {
    alzheimer: {
      id: 'alzheimer',
      title: "Alzheimer's",
      subtitle: 'MRI Image Classification',
      icon: brain,
      gradient: 'from-pink-400 to-pink-600',
      about: {
        description: "Alzheimer's disease is a progressive neurological disorder that causes brain cells to waste away and die. It's the most common cause of dementia, affecting memory, thinking, and behavior. Early detection is crucial for managing symptoms and planning care.",
        riskFactors: [
          'Age (65+)',
          'Family history',
          'APOE gene variants',
          'Cognitive decline',
          'Brain imaging patterns'
        ]
      },
      modelInfo: {
        accuracy: '72%',
        samples: '5k+',
        description: 'Our AI model analyzes cognitive test results, brain imaging data, MRI scans and demographic factors to assess Alzheimer\'s risk. Using advanced Deep learning algorithms trained on thousands of clinical cases, it provides accurate risk assessments to support early intervention.'
      },
      formFields: [
        {
            name: 'mri_image',
            label: "MRI Image of Brain",
            type: 'file',
            accept: 'image/*'
        }
      ]
    },
    brain: {
      id: 'brain',
      title: 'Brain Tumor',
      subtitle: 'MRI Image Classification',
      icon: brain, 
      gradient: 'from-purple-500 to-pink-600',
      about: {
        description: "Brain tumor detection involves identifying abnormal cell growth in the brain using MRI scans. Tumors can be cancerous (malignant) or non-cancerous (benign). Early detection helps improve treatment outcomes and survival rates.",
        riskFactors: [
          'Genetic mutations',
          'Exposure to radiation',
          'Family history of brain tumors',
          'Weakened immune system',
          'Age (40+)'
        ]
      },
      modelInfo: {
        accuracy: '97%',
        samples: '4.5k+',
        description: 'Our deep learning model uses MRI image analysis to classify tumors into types like glioma, meningioma, and pituitary. It leverages ResNet50 transfer learning for accurate and efficient detection.'
      },
      formFields: [
        {
          name: 'mri_image',
          label: 'MRI Image of Brain',
          type: 'file',
          accept: 'image/*'
        }
      ]
    },

    heart: {
      id: 'heart',
      title: 'Heart Disease',
      subtitle: 'Cardiovascular Risk',
      icon: heart,
      gradient: 'from-red-400 to-red-600',
      about: {
        description: "Heart disease describes a range of conditions that affect your heart. Types include coronary artery disease, heart rhythm problems, and heart defects. Many forms can be prevented or treated with healthy lifestyle choices.",
        riskFactors: [
          'High blood pressure',
          'High cholesterol',
          'Smoking',
          'Diabetes',
          'Family history',
          'Obesity'
        ]
      },
      modelInfo: {
        accuracy: '93%',
        samples: '70k+',
        description: 'Our cardiovascular model evaluates multiple risk factors including blood pressure, cholesterol levels, lifestyle factors, and family history. It uses evidence-based algorithms to predict heart disease risk and recommend preventive measures.'
      },
      formFields: [
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
        { name: 'weight', label: 'Weight', type: 'number', placeholder:'70'},
        { name: 'height', label: 'Height', type: 'number', placeholder:'176'},
        { name: 'age_in_yrs', label: 'Age (years)', type: 'number', placeholder: '50' },
        { name: 'ap_lo', label: 'Diastolic BP (ap_lo)', type: 'number', placeholder: '80' },
        { name: 'ap_hi', label: 'Systolic BP (ap_hi)', type: 'number', placeholder: '120' },

        { 
          name: 'cholesterol', 
          label: 'Cholesterol Level', 
          type: 'select', 
          options: ['Normal', 'Above Normal', 'Well Above Normal'] 
        },
        { 
          name: 'gluc', 
          label: 'Glucose Level', 
          type: 'select', 
          options: ['Normal', 'Above Normal', 'Well Above Normal'] 
        },
        { name: 'smoke', label: 'Do you smoke?', type: 'select', options: ['No', 'Yes'] },
        { name: 'alco', label: 'Do you consume alcohol?', type: 'select', options: ['No', 'Yes'] },
        { name: 'active', label: 'Are you physically active?', type: 'select', options: ['No', 'Yes'] },
        
      ]

    }
  };