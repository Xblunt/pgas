export interface CreateUser {
  name: string;
  second_name: string;
  patronymic: string;
  gradebook_number: string;
  birth_date: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface UpdateUser {
  uuid: string;
  name: string;
  second_name: string;
  patronymic: string;
  gradebook_number: string;
  birth_date: string;
  email: string;
  phone_number: string;
}