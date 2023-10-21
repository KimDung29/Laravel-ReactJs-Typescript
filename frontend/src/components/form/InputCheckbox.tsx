import { FormType } from "./FormType";

export default function InputCheckbox({ label, name, onCheckboxChange }: FormType) {
  return (
    <>
      <div>
        <input
          onChange={onCheckboxChange}
          name={name}
          type="checkbox"
          className="is-seller"
        />
        <label htmlFor={name} className="role-lable">
          {label}
        </label>
      </div>
    </>
  );
}
