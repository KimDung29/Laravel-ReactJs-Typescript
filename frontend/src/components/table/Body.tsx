import { ProductType } from "../admin/Produts"
import Delete from "./Delete"

interface BodyType {
	data: ProductType[],
	onDelete: (id: number) => void,
}

export default function Body( { data, onDelete} :BodyType) {

  return (
	<>
	<tbody>
		{data.map((item, i) => (
			<tr key={i}>
			<td>{i++ + 1}</td>
			<td>{item.name}</td>
			<td>${item.price}</td>
			<td>{item.color}</td>
			<td>{item.size}</td>
			<td>
				<a href={`/admin/product/update/${item.id}`} >
					<button >Edit</button>
				</a>
			</td>
			<Delete onDelete={onDelete} id={item.id} />
			</tr>
		))}
	</tbody>
	</>
  )
}
