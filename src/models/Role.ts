export interface RoleMember {
  uuid: string;
  name: string;
  second_name: string;
  patronymic: string;
}

export interface Role {
  uuid: string;
  name: string;
  members: RoleMember[];
}

export interface SimpleRole {
  uuid: string;
  name: string;
}