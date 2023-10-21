import { HeaderType } from "../../services/productTitle";

interface HeadProps {
	headers: HeaderType[];
}

export default function Head( { headers }:HeadProps) {

  return (
	<>
		<thead>
			<tr >
			{headers.map((head, i) => (
				<th key={i}>{head.name}</th>
			))}
			</tr>
		</thead>
	</>
  )
}
