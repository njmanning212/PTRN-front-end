/* ---------==== custom forms ====--------- */

export interface CreateProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roleString: string;
  clinicId: number | null;
}

/* ---------===== auth forms =====--------- */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
  adminCode: string;
}

export interface ChangePasswordFormData {
  curPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}

