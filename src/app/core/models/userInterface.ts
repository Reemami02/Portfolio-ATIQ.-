export interface User {
  _id?: string;
  name: string;
  age?: number;
  nationality?: string;
  gender?: 'female' | 'male';
  phone?: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}
