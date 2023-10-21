// import { HeaderType } from "../../services/productTitle";
import { HeaderType } from "../../services/productTitle";
import { ProductType } from "../admin/Produts";
import Body from "./Body";
import Head from "./Head";

interface TableType {
	headers: HeaderType[],
	data: ProductType[],
	onDelete: (id :number) => void, 
}


export default function Table({ headers, data , onDelete }:TableType ) {
  return (
	<>
		<table className="product-table">
			<Head headers={headers} />
			<Body {...{ data, onDelete }} />
		</table>
	</>
  )
}
