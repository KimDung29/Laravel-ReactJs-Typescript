import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../../axios-client";
import { ProductType } from "./Produts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import FormTitle from "../form/FormTitle";
import InputArea from "../form/InputArea";


const initValue = {
	user_id: 0,
	id: 0,
	name: '',
	short_desc: '',
	long_desc: '',
	image  :'image',
	price: '',
	color: '',
	size: '',
	quantity: '',
}

export default function EditProduct() {
	const { id } = useParams();
	// const navigate = useNavigate();
	// const dispatch = useDispatch();

	const { errors,  notification} = useSelector((state: RootState) => state.errors)

	const [value, setValue] = useState(initValue as ProductType);


	useEffect(() => {
		axiosClient.get(`/admin-product/${id}`)
		.then((response) => {
			setValue(response.data.product)
		})
		.catch((e) => console.log(e.response))
	}, [])	


  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue( { ...value, [e.target.name]: e.target.value } );
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    if (e.target.files ) {
      setValue({ ...value, image: e.target.files[0] ? e.target.files[0] : 'image' });
    }
  }
  
  
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
	e.preventDefault();
	console.log('value update', value)
	

	axiosClient.put(`/admin-product/update/${id}`, value)
	.then(res => {
		console.log('update res: ', res)
	})
	.catch(err => {
		console.log('err update: ', err)
	})
  }
  
  return (
	<>
		<div className="login-signup-form animated fadeInDown">
			<div className="form-product">
				<form onSubmit={onSubmit}>
					<FormTitle {...{ 
					title:"Edit product " , 
					notification: notification 
					}}/>
				
					<div>
						<label htmlFor='name'>Name</label>
						<input onChange={onInputChange} name='name' value={value.name}  type='text' />
						<p className="message-error"> { errors.name }</p>
					</div>

					<div>
						<label htmlFor='short_desc'>Short description</label>
						<input onChange={onInputChange} name='short_desc' value={value.short_desc}  type='text'  placeholder='Short description'/>
						<p className="message-error"> { errors.short_desc }</p>
					</div>

					<InputArea {...{ 
					label:'Long Description', 
					name:'long_desc', 
					value: value.long_desc,
					placeholder:'Describle your product', 
					onChange:onInputChange, 
					}} />

					<div>
						<label htmlFor='image'>Image</label>
						<input onChange={onFileChange} name='image'  type='file'/>
						{/* <p className="message-error"> { nameError }</p>
						<p className="message-error"> { original !== null ? original : '' }</p> */}
					</div>
	
					<div>
						<label htmlFor='price'>Price</label>
						<input onChange={onInputChange} name='price' value={value.price}  type='number' placeholder=' The price of the product'/>
						{/* <p className="message-error"> { nameError }</p>
						<p className="message-error"> { original !== null ? original : '' }</p> */}
					</div>

					<div>
						<label htmlFor='color'>Color</label>
						<input onChange={onInputChange} name='color' value={value.color}  type='text' placeholder="Text your product's color, sperate by comma"/>
						{/* <p className="message-error"> { nameError }</p>
						<p className="message-error"> { original !== null ? original : '' }</p> */}
					</div>

					<div>
						<label htmlFor='size'>Size</label>
						<input onChange={onInputChange} name='size' value={value.size}  type='text' placeholder="Text your product's size, sperate by comma"/>
						{/* <p className="message-error"> { nameError }</p>
						<p className="message-error"> { original !== null ? original : '' }</p> */}
					</div>

					<div>
						<label htmlFor='quantity'>Quantity</label>
						<input onChange={onInputChange} name='quantity' value={value.quantity}  type='number' placeholder="Quantity"/>
						{/* <p className="message-error"> { nameError }</p>
						<p className="message-error"> { original !== null ? original : '' }</p> */}
					</div>

					<button className="btn btn-block" type="submit">Submit</button>
				</form>
			</div>
		</div>
		
	</>
  )
}
