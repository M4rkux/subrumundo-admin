import { ILoggedUser } from "@/interface/user";
import axios from "axios";
import config from "@/config";

export async function authenticate(
  email: string,
  password: string
): Promise<ILoggedUser | undefined> {
  try {
    const { data } = await axios.post(
      `${config.BASE_URL}/authentication/login`,
      {
        email,
        password,
      }
    );
    return data;
  } catch (e) {
    console.error(e);
  }
}
