export interface UserData {
    userId: number;
    name: string;
    lastName: string;
    email: string;
    role: string;
    emailVerified: boolean;
    updatePassword: string;
    faculty: string | null;
}

export type UserRole = 'SU' | 'ADMIN' | 'USER';
