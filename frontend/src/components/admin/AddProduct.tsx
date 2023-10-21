import { useState } from "react"
import { ProductType } from "./Produts"

export default function AddProduct() {
  const [value, setValue] = useState({
		name: '',
		short_desc: '',
		long_desc: '',
		image  :'',
		price: 0,
		color: '',
		size: '',
		quantity: '',
		created_at: '',
	} as ProductType)

  
  return (
	<div>AddProduct</div>
  )
}
