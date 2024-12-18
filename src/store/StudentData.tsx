import { proxy } from "valtio";

interface AppState {
  id: string;
  firstName: string;
  middleName: string;
  sex: string;
  lastName: string;
  email: string;
}

export const studentData = proxy<AppState>({
  id: "",
  firstName: "",
  middleName: "",
  lastName: "",
  sex: "",
  email: "",
});
