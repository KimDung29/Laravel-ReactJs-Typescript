import { useEffect, useState } from "react"
import axiosClient from "../../axios-client"
import { useDispatch, useSelector } from "react-redux";
import { headers } from "../../services/product";
import Table from "../table/Table";
import { RootState } from "../../store";
import { setNotification } from "../../slices/errorsSlices";

export interface ProductType {
  user_id : number , 
  id: number,
  name?:string;
  short_desc?:string;
  long_desc?:string;
  image? : File | string,
  price?:string;
  color?:string;
  size?:string;
  quantity?:string;
  created_at?:string;
}


export default function Produts() {

  const { notification } = useSelector((state: RootState) => state.errors)
  const dispatch = useDispatch();


  const [products, setProducts ] = useState([] as ProductType[])

  useEffect(() => {
		axiosClient.get(`/admin-products`)
		.then((response) => {
      
      setProducts(response.data.products)
		})
		.catch((e) => console.log(e.response))
	}, [])	



  const handleDelete = (id :number) => {
    axiosClient.delete(`/admin-product/${id}`)
    .then(res => {
      if(res.status === 200 || res.status ===204) {
        dispatch(setNotification('Delete Product Successfully. '))
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    })
    .catch(e =>  dispatch(setNotification(`There is problem:  ${e.response.data.message} ` )));
  }


  return (
	<>
    <div className="admin-product-wrapper">
      <div className="admin-product-nav">
        <p className="message-success">{ notification }</p>
        <a href="/admin/product/add-new">
          <button className="admin-product-btn-add-new">Add New</button>
        </a>
      </div>

      <div className="admin-product-content">
        {products.length === 0 && <p>There are no products .</p>}
        {products && products.length > 0 && (
          <Table {...{ headers, data:products, onDelete: handleDelete }} />
         
        )}
      </div>
    </div>
  </>
  )
}
