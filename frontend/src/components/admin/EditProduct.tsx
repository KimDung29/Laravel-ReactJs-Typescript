import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../../axios-client";
import { ProductType } from "./Produts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setErrors } from "../../slices/errorsSlices";
import { sizeLable } from "../../services/productTitle";


const initValue = {
	user_id: 0,
	id: 0,
	name: '',
	short_desc: '',
	long_desc: '',
	image  :'image',
	price: '',
	color: '',
	size: 'S',
	quantity: '',
}

export default function EditProduct() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { errors } = useSelector((state: RootState) => state.errors)
	const [notification, setNotification ] = useState('');

	const [value, setValue] = useState(initValue as ProductType);
	const [sizeProducts, setSizeProducts ] = useState([] as string[] )
	
	useEffect(() => {
		axiosClient.get(`/admin-product/${id}`)
		.then((response) => {
			setValue(response.data.product)
		})
		.catch((e) => console.log(e.response))
	}, [])	

	useEffect(() => {
		setValue({ ...value, size: sizeProducts.join(',') });
	}, [sizeProducts]);
		

	// Input change
	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue( { ...value, [e.target.name]: e.target.value } );
	}

	// Long description handling
	const onTexareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
	setValue( { ...value, [e.target.name]: e.target.value } );
	}

	// Upload image handling
	const onFileChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
	if (e.target.files ) {
		setValue({ ...value, image: e.target.files[0] ? e.target.files[0] : 'image' });
	}
	}

	// Check box handling
	const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setSizeProducts((prevSelectedSizes) => [...prevSelectedSizes, e.target.value]);
		} else {
			// If the checkbox is unchecked, remove the value from the sizeProducts array
			setSizeProducts((prevSizes) => prevSizes.filter((size) => size !== e.target.value));
		}
	};

	
	const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('value update', value)
		

		axiosClient.put(`/admin-product/update/${id}`, value)
		.then(res => {
			console.log('update res: ', res)

			if(res.status === 422) {
				// dispatch(setErrors(res.data.errors));
			}

			if(res.status === 201) {
				setNotification('Update successfully.')
			}
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
					<h1 className="title">Add a product </h1>
					<p className="message-success">{notification}</p>
				
					<div>
						<label htmlFor='name'>Product Name</label>
						<input onChange={onInputChange} name='name' value={value.name} type='text' />
						<p className="message-error"> { errors.name }</p>
					</div>

					<div>
						<label htmlFor='short_desc'>Short description</label>
						<input onChange={onInputChange} name='short_desc' type='text' value={value.short_desc} placeholder='Short description'/>
						<p className="message-error"> { errors.short_desc }</p>
					</div>
					<div>
						<label htmlFor="long_desc">Long Description</label>
						<textarea name="long_desc" 
						onChange={onTexareaChange} 
						cols={30} rows={10}  className="textarea" 
						value={value.long_desc}
						placeholder='Describle your product'></textarea>
					</div>

					<div>
						<label htmlFor='image'>Product Image</label>
						<input onChange={onFileChange} name='image'  type='file'/>
						<p className="message-error"> { errors.image }</p>
					</div>

					<div>
						<label htmlFor='price'>Price</label>
						<input onChange={onInputChange} name='price' value={value.price} type='number' placeholder=' The price of the product'/>
						<p className="message-error"> { errors.price }</p>
					</div>

					<div>
						<label htmlFor='color'>Color</label>
						<input onChange={onInputChange} name='color' type='text' value={value.color} placeholder="Text your product's color, sperate by comma"/>
						<p className="message-error"> { errors.color }</p>
					</div>

					<div >
						<p >Size</p>
							<div  className="add-product-size-group"> 
								{sizeLable.map((size, i) => (
									<div key={i} className="add-product">
										<input 
										checked={value?.size && value.size.includes(size) ? true : false}
										onChange={onCheckboxChange} 
										name="size" value={size}  
										type="checkbox"  
										className="input-checkbox" 
										/>
										<label htmlFor="size" className="label-checkbox">{size}</label>
									</div>
								))}
								<p className="message-error"> { errors.size }</p>
							</div>

					</div>

					<div>
						<label htmlFor='quantity'>Quantity</label>
						<input onChange={onInputChange} name='quantity' value={value.quantity} type='number' placeholder="Quantity"/>
						<p className="message-error"> { errors.quantity }</p>
					</div>

					<button className="btn btn-block" type="submit">Submit</button>
				</form>
			</div>
		</div>
	</>
  )
}
