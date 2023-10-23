
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { productTable } from "../../services/product";
import { ProductType } from "../admin/Produts";

export default function Home() {
  const [products, setProducts ] = useState([] as ProductType[]);

	useEffect(() => {
		axiosClient.get(`/products`)
		.then((response) => {
			setProducts(response.data.products)
		})
		.catch((e) => console.log(e.response))
	}, [])	

  return (
    <>
      <br/>
      <h3>Product list</h3>
      <br/>
      {products.length === 0 && <p>There are no products .</p>}
        {products && products.length > 0 && (
          <table className="product-table">
          <thead>
            <tr >
            {productTable.map((head, i) => (
              <th key={i}>{ head.name}</th>
            ))}
            </tr>
          </thead>
          <tbody>
          {products.map((item, i) => (
            <tr key={i}>
              <td>{i++ + 1}</td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.color}</td>
              <td>{item.size}</td>
            </tr>
          ))}
        </tbody>
        </table>
         
        )}
    </>
  )
}
