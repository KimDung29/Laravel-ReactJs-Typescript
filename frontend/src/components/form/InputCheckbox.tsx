import { FormType } from "./FormType";

export default function InputCheckbox({ label, name, onCheckboxChange, value, checkedValue }: FormType) {
  return (
    <>
      <div>
        <input
          onChange={onCheckboxChange}
          name={name}
          value={value ? value : ''}
          type="checkbox"
          className="is-seller"
          checked={value === checkedValue}
		// checked
        />
        <label htmlFor={name} className="role-lable">
          {label}
        </label>
      </div>
    </>
  );
}
