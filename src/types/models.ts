/* ---------===== custom props ====--------- */



/* ---------===== auth models =====--------- */

export interface Profile {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roleName: string;
  roleValue: number;
  profilePhotoUrl: string | null;
  clinicId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
