
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import axiosClient from "../../axios-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import FormTitle from "../form/FormTitle";
import InputText from "../form/InputText";
import FormButton from "../form/FormButton";
import { setErrors, setNotification } from "../../slices/errorsSlices";


export default function Login() {
  const navigate = useNavigate()
  const [values, setValues ] = useState({
    email: '',
    password: ''
  } );

  const dispatch = useDispatch();
  const { errors, notification } = useSelector((state: RootState) => state.errors)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (ev: React.ChangeEvent<HTMLFormElement>) => {
    ev.preventDefault()

    axiosClient.post('/login', values)
      .then((response) => {
        // Todo: delete it
        console.log('response: ', response)

        if(response.status === 422 && response.data.errors) {
          dispatch(setErrors(response.data.errors));        
        }
        
        if (response.status === 200 && response.data.original?.message) {
          dispatch(setErrors( response.data.original ))
        } 

        if(response.status === 200 && response.data.user ) {
          dispatch(setNotification( response.data.message ))

          localStorage.setItem('CURRENT_USER_ID', response.data.user.id)

          localStorage.setItem('ACCESS_TOKEN', response.data.token)
          
          if(response.data.user.role === 'admin') {
            localStorage.setItem('ROLE', 'admin')
          }else {
            localStorage.setItem('ROLE', 'client')
          }

          setTimeout(() => {
            if (response.data.user.role === 'admin') {
              navigate('/admin'); 
              window.location.reload()
            } 
            else  {
              navigate('/'); 
              window.location.reload()
            }
          }, 1000);
        }
        }
      )
      .catch((err) => {
        console.log('error: ', err)
      })
  }


  return (
        <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <form onSubmit={onSubmit}>
          <FormTitle {...{ 
            title:"Login" , 
            notification: notification 
          }}/>
     
          <InputText 
            label={'Email'} 
            name={'email'} 
            type={'email'} 
            placeholder={'Email Addres'}
            onChange={onInputChange}
            error={errors.email} 
            original={ errors.original}
         />

          <InputText {...{ 
            label:'Password', 
            name:'password', 
            type:'password', 
            placeholder:'Password', 
            onChange:onInputChange, 
            error: errors.password 
          }} />

          <FormButton {...{ 
            label:'Login', 
            placeholder:"Don't have an account ? " , 
            link:'register', 
            button:'Register' 
          }} />
          
          </form>
        </div>
      </div>
      )
}

