type FormType = 'signin' | 'signup';

export interface AuthFormData {
  email: string;
  password: string;
}
export interface AuthFormError {
  email: string;
  password: string;
}

export interface AuthFormProps {
  formType: FormType;
}
