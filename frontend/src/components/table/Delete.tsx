
interface DeleleType {
	onDelete: (id: number) => void,
	id: number 
}

export default function Delete({ onDelete, id } : DeleleType) {
  return (
	<>
	<td>
		<button onClick={() => onDelete(id)}>Delele</button>
	</td>
	</>
  )
}
