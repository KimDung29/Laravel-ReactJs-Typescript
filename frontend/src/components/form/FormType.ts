
export interface FormType {
  nameError?: string[];
	emailError?: string[];
  avatarError?: string[];
	passwordError?: string[];
	original?: string | null;
  notification?: string | null;
  label?: string , 
  name?: string, 
  value?: string | number | null;
  type?: string,
  placeholder?:string ,
  title?: string,
  checkedValue?: string,
  link?: string,
  button?:string,
  error?: string[] | null,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onCheckboxChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}



