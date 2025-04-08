export interface UserData {
    userId?: number;
    name: string;
    lastName: string;
    email: string;
    role: string;
    faculty: string;
}

export type UserRole = 'SU' | 'ADMIN' | 'USER';
