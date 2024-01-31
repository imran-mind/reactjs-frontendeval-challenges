import { useState } from 'react';
import './App.css';
import UserForm from './UserForm';
import FormDetails from './FormDetails';

function App() {
  const data = [
    {
      id: "name",
      label: "Name",
      inputType: "text",
      buttonName: "Next",
      placeholder: "Your Name..."
    },
    {
      id: "email",
      label: "Email",
      inputType: "email",
      buttonName: "Next",
      placeholder: "Your Email..."
    },
    {
      id: "dob",
      label: "DOB",
      inputType: "date",
      buttonName: "Next",
      placeholder: ""
    },
    {
      id: "password",
      label: "Password",
      inputType: "password",
      buttonName: "Submit",
      placeholder: ""
    }
  ];
  const [forms, setForms] = useState(data);
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    password: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (index === forms.length - 1) {
      console.log('Form submitted');
      setIsFormSubmitted(true);
    } else {
      setIndex((idx) => idx + 1);
    }
  }

  const handleBack = (e) => {
    e.preventDefault();
    setIndex((idx) => idx - 1);
  }

  const handleInputChange = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    const copyFormData = { ...formData };
    copyFormData[id] = val;
    setFormData(copyFormData);
  }
  console.log('formData-> ', formData);

  return (
    <div className='App'>
      {!isFormSubmitted ?
        <UserForm
          index={index}
          forms={forms}
          formData={formData}
          handleBack={handleBack}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        : <FormDetails formData={formData} />
      }
    </div>
  )
}

export default App;
