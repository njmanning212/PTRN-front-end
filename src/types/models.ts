/* ---------===== custom props ====--------- */

import { SvgIconComponent } from "@mui/icons-material";

export interface NavMenuItem {
  title: string;
  icon: SvgIconComponent;
  bgColor: string;
  path: string;
}


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
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
