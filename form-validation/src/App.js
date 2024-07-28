import { useState } from 'react';
import './App.css';

function App() {
  const defaultValues = {
    firstName: {
      id: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'First Name...',
      value: '',
      isError: false,
      errorMsg: "First Name can't be empty"
    },
    lastName: {
      id: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Last Name...',
      value: '',
      isError: false,
      errorMsg: "Last Name can't be empty"
    },
    email: {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Email...',
      value: '',
      isError: false,
      errorMsg: "Email Name can't be empty"
    },
    password: {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Password...',
      value: '',
      isError: false,
      errorMsg: "Password  can't be empty"
    },
    confirmPassword: {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm Password...',
      value: '',
      isError: false,
      errorMsg: "Confimr Password  can't be empty"
    }
  }
  const [formData, setFormData] = useState(defaultValues);
  const [isPassMatch, setIsPassMatch] = useState(true);

  const handleInput = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    console.log(key, value)
    const copyFormData = { ...formData };
    copyFormData[key].value = value;
    setFormData(copyFormData);
    isValidForm()
  }
  console.log(formData);

  const passwordMatch = () => {
    const copyFormData = { ...formData };
    const pass = copyFormData['password'].value;
    const cPass = copyFormData['confirmPassword'].value;
    if (pass !== cPass) {
      setIsPassMatch(false);
    } else {
      setIsPassMatch(true);
    }
  }
  const isValidForm = () => {
    const copyFormData = { ...formData };
    Object.keys(copyFormData)
      .forEach(key => {
        const obj = copyFormData[key];
        obj.isError = !obj.value ? true : false;
        passwordMatch();
      });
    setFormData(copyFormData);
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    isValidForm()
  }
  console.log('passwordMatch ', isPassMatch)
  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          {
            Object.keys(formData)
              .map((key) => {
                const { id, label, type, placeholder,
                  value, isError, errorMsg
                } = formData[key];
                return <div className='form-item'>
                  <label>{label}</label>
                  <input
                    onChange={handleInput}
                    id={id}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    className={
                      isError && 'error-border'
                    }
                  />
                  {
                    isError &&
                    <span className='error'>{errorMsg}</span>
                  }
                  {
                    key === 'confirmPassword'
                    && !isPassMatch &&
                    <span className='error'>
                      Password does not match
                    </span>
                  }
                </div>
              })
          }
          <div className='form-item'>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
