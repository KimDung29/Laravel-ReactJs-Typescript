import { FormType } from "./FormType"

export default function InputText( { label, name, type, placeholder, onChange, error , original} :FormType) {
	

  return (
	<>
		<div>
			<label htmlFor={name}>{label}</label>
			<input onChange={onChange} name={name}  type={type} placeholder={placeholder}/>
			<p className="message-error"> { error }</p>
			<p className="message-error"> { original !== null ? original : '' }</p>
		</div>
	</>
  )
}
