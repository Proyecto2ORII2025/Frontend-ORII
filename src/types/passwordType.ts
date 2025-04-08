export interface ChangePasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface UpdatePasswordPayload {
    userId: number;
    actualPassword: string;
    newPassword: string;
}