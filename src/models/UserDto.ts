export interface User {
    uuid: string;
    name: string;
    second_name?: string;
    patronymic?: string;
    gradebook_number?: string;
    birth_date?: string;
    email: string;
    phone_number?: string;
    role?: string;
    status?: string;
    isActive?: boolean;
}
