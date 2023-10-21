import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import InputText from "../form/InputText";
import InputCheckbox from "../form/InputCheckbox";
import FormButton from "../form/FormButton";
import { setAvatarError, setEmailError, setNameError, setNotification, setPasswordError } from "../../slices/errorsSlices";
import FormTitle from "../form/FormTitle";

export interface InitialValueType {
  name?: string,
  email?: string,
  avatar?: File | string,
  password?: string,
  password_confirmation?: string,
  role?: string
}

const initialValue = {
  name: '',
  email: '',
  avatar: 'image',
  password: '',
  password_confirmation: '',
  role: 'client'
}

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValue as InitialValueType)
  const {nameError, emailError , passwordError,avatarError, original, notification} = useSelector((state: RootState) => state.errors)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues( { ...values, [e.target.name]: e.target.value } );
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    console.log('file', e.target.files)
    if (e.target.files ) {
      setValues({ ...values, avatar: e.target.files[0] ? e.target.files[0] : 'image' });
    }
  }

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, role: e.target.checked  ? 'admin' : 'client'});
  }

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    axiosClient.post('/register', values)
      .then((response) => {
        console.log('response: ', response)

        if(response.status === 422) {
          const errors = response.data.errors;
          dispatch(setNameError(errors.name))
          dispatch(setEmailError(errors.email))
          dispatch(setAvatarError(errors.avatar))
          dispatch(setPasswordError(errors.password))
        }
        if(response.status === 201) {
          dispatch(setNotification(response.data.message))
          
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(error.response.data.errors);  
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
    <div className="form">
      <form onSubmit={onSubmit}>
        <FormTitle {...{ 
          title:"Create an account" , 
          notification: notification 
        }}/>
     
        <InputText {...{ 
          label:'Name', 
          name:'name', 
          type:'text', 
          placeholder:'Full Name', 
          onChange:onInputChange, 
          error: nameError, 
          original:  original
        }} />

        <InputText {...{ 
          label:'Email', 
          name:'email', 
          type:'email', 
          placeholder:'Email Address', 
          onChange:onInputChange, 
          error: emailError, 
          original: original 
        }} />
      
        <InputText {...{ 
          label:'Avatar', 
          name:'avatar',
          type:'file', 
          placeholder:'Upload your avatar', 
          onChange:onFileChange, 
          error: avatarError 
        }} />
        
        <InputText {...{ 
          label:'Password', 
          name:'password', 
          type:'password', 
          placeholder:'Password', 
          onChange:onInputChange, 
          error: passwordError 
        }} />

        <InputText {...{ 
          label:'Password Confirmation', 
          name:'password_confirmation', 
          type:'password', 
          placeholder:'Repeat Password', 
          onChange:onInputChange 
        }} />
      
        <InputCheckbox {...{ 
          label: 'Are you a seller ?', 
          name:'role' , 
          onCheckboxChange 
        }} />

        <FormButton {...{ 
          label:'Signup', 
          placeholder:'Already registered ?', 
          link:'login', 
          button:'Sign In' 
        }} />

      </form>
    </div>
  </div>
  )
}
