export interface User {
  uuid?: string;
  name: string;
  second_name: string;
  patronymic: string;
  gradebook_number: string;
  birth_date: string;
  email: string;
  phone_number: string;
  valid?: boolean;
  password?: string;
  all_achievement_verified?: boolean;
  points_amount?: number;
  achievement_amount?: number;
}

export interface Position {
  current_pos: number;
  current_points: number;
  leader_points: number;
}