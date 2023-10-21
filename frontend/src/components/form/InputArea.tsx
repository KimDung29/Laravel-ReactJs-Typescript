import { FormType } from "./FormType";

export default function InputArea({ label, name, value } : FormType) {
  return (
	<>
		<div>
			<label htmlFor="">{label}</label>
			<textarea name={name} id="" className="textarea" cols={30} rows={10} defaultValue={value ? value : ''}></textarea>
		</div>
	</>
  )
}
