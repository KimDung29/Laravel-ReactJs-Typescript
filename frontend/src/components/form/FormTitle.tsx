import { FormType } from "./FormType";

export default function FormTitle({ title, notification} :FormType)  {
  return (
	<>
		<h1 className="title">{title}</h1>
        <p className="message-success">{notification}</p>
	</>
  )
}
