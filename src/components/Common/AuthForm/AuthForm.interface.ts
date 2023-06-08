type FormType = 'login' | 'signup';

export interface AuthFormData {
  name?: string;
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
