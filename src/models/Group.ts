import { Resource } from "./Resource";
import { Role } from "./Role";

export interface Group {
  uuid: string;
  name: string;
  roles: Role[];
  resources: Resource[];
}

export interface SimpleGroup {
  uuid: string;
  name: string;
}

