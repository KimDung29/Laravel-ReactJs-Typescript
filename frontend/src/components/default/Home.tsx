
import { useEffect, useState } from "react";
import { Product } from "../admin/Produts";
import axiosClient from "../../axios-client";

export default function Home() {
  const [products, setProducts ] = useState([] as Product[]);

	useEffect(() => {
		axiosClient.get(`/products`)
		.then((response) => {

      console.log('client product: ', response)

			setProducts(response.data.product)
		})
		.catch((e) => console.log(e.response))
	}, [])	
  console.log(products)

  return (
    <>
      <h1>Home content</h1>
      {/* {users.length === 0 && <p>There are no users.</p>}
      {users.length > 0 && users.map((user, i) => (
        user. === 1 ? <p key={i}>Seller</p> : <p key={i}>Buyer</p>
      ))} */}
    </>
  )
}
