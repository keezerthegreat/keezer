import { proxy } from "valtio";
interface AppState {
  userName: string;
  confirmPassword: string;
  password: string;
  newPassword: string;
  recoveryPass: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNum: string;
  open: boolean;
  open2: boolean;
  open3: boolean;
}

export const usersData = proxy<AppState>({
  userName: "",
  password: "",
  newPassword: "",
  confirmPassword: "",
  recoveryPass: "",
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phoneNum: "",
  open: true,
  open2: true,
  open3: true,
});
