import { Link } from "react-router-dom";
import { FormType } from "./FormType";

export default function FormButton({ label, placeholder, link, button}: FormType) {
  return (
	<>
		<button className="btn btn-block">{label}</button>
        <p className="message">{placeholder}<Link to={`/${link}`} >{button}</Link></p>
	</>
  )
}
