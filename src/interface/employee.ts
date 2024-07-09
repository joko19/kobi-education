export interface Employee {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
  profile_image: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface Product {
  product_name: string;
  unit: string;
  price: number;
  quantity: number;
}
