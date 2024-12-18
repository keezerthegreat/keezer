import { proxy } from "valtio";

interface AppState {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  sex: string;
  email: string;
}

export const archiveData = proxy<AppState>({
  id: "",
  firstName: "",
  middleName: "",
  lastName: "",
  sex: "",
  email: "",
});
