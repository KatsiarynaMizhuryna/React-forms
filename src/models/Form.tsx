export interface Form {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  acceptTerms: boolean;
  picture: FileReader | File | null | File[] | string;
  country: string;
}
