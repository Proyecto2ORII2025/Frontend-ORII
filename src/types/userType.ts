export interface UserData {
    userId?: number;
    name: string;
    lastName: string;
    email: string;
    role: string;
    faculty: string;
}

export type UserRole = 'SU' | 'ADMIN' | 'USER';

export interface CreateUserResponse {
    success: boolean;
    data?: {
        name: string;
        lastName: string;
        email: string;
        role: string;
        faculty: string;
    }
    error?: string;
    field?: 'name' | 'lastName' | 'email' | 'role' | 'faculty' | 'root';
}