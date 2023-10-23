import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axiosClient from "../../axios-client";
import { ProductType } from "./Produts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import FormTitle from "../form/FormTitle";
import { setErrors } from "../../slices/errorsSlices";

const userId = sessionStorage.getItem('CURRENT_USER_ID');

const initValue = {
	user_id: Number(userId),
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
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { errors} = useSelector((state: RootState) => state.errors)
	const [notification, setNotification ] = useState('');

	const [sizeProducts, setSizeProducts ] = useState([] as string[] )
	const [value, setValue] = useState( initValue as ProductType)

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
      setSizeProducts((prevSelectedSizes ) => [...prevSelectedSizes, e.target.value]);
    } else {
		// If the checkbox is unchecked, remove the value from the sizeProducts array
		setSizeProducts((prevSizes) => prevSizes.filter((size) => size !== e.target.value));
    }
	setValue({...value, size: sizeProducts.join(',')});
  }

// console.log('value: ', value)

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
	e.preventDefault();

	axiosClient.post(`/admin-product/add`, value)
	.then(res => {

		if(res.status === 422) {
			dispatch(setErrors(res.data.errors))
		}
		if(res.status === 201) {
			setNotification(res.data.message)
			setTimeout(() => {
				navigate('/admin/products')
			}, 1500);
		}
	})
	.catch(err => {
		console.log('err add: ', err)
	})
  }
  

  return (
	<>
		<div className="login-signup-form animated fadeInDown">
			<div className="form-product">
				<form onSubmit={onSubmit}>
					<FormTitle {...{ 
					title:"Add a product " , 
					notification: notification 
					}}/>
				
					<div>
						<label htmlFor='name'>Product Name</label>
						<input onChange={onInputChange} name='name'  type='text' />
						<p className="message-error"> { errors.name }</p>
					</div>

					<div>
						<label htmlFor='short_desc'>Short description</label>
						<input onChange={onInputChange} name='short_desc' type='text'  placeholder='Short description'/>
						<p className="message-error"> { errors.short_desc }</p>
					</div>
					<div>
						<label htmlFor="long_desc">Long Description</label>
						<textarea name="long_desc" onChange={onTexareaChange} id="" cols={30} rows={10}  className="textarea" placeholder='Describle your product'></textarea>
					</div>

					<div>
						<label htmlFor='image'>Product Image</label>
						<input onChange={onFileChange} name='image'  type='file'/>
						<p className="message-error"> { errors.image }</p>
					</div>
	
					<div>
						<label htmlFor='price'>Price</label>
						<input onChange={onInputChange} name='price'  type='number' placeholder=' The price of the product'/>
						<p className="message-error"> { errors.price }</p>
					</div>

					<div>
						<label htmlFor='color'>Color</label>
						<input onChange={onInputChange} name='color' type='text' placeholder="Text your product's color, sperate by comma"/>
						<p className="message-error"> { errors.color }</p>
					</div>

					<div >
						<p >Size</p>
						<div className="add-product-size-group"> 
							<div className="add-product">
								<input type="checkbox" onChange={onCheckboxChange} name="size" value={"S"}  id="" className="input-checkbox" />
								<label htmlFor="size" className="label-checkbox">S</label>
							</div>

							<div className="add-product">
								<input type="checkbox" onChange={onCheckboxChange} name="size" value={"M"}  id="" className="input-checkbox" />
								<label htmlFor="size" className="label-checkbox">M</label>
							</div>
							<div className="add-product">
								<input type="checkbox" onChange={onCheckboxChange} name="size"  value={"L"} id="" className="input-checkbox" />
								<label htmlFor="size" className="label-checkbox">L</label>
							</div>


							<p className="message-error"> { errors.size }</p>

						</div>
					</div>

					<div>
						<label htmlFor='quantity'>Quantity</label>
						<input onChange={onInputChange} name='quantity' type='number' placeholder="Quantity"/>
						<p className="message-error"> { errors.quantity }</p>
					</div>

					<button className="btn btn-block" type="submit">Submit</button>
				</form>
			</div>
		</div>
		
	</>
  )
}
