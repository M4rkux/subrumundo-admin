import axios from "axios";
import config from "@/config";
import { IPatronCreateView, IPatronView } from "@/interface/patron";

export async function getPatrons(
  page: number,
  sort: string,
  search: string
): Promise<IPatronView> {
  try {
    const { data } = await axios.get(
      `${config.API_URL}/patron?page=${page}&sort=${sort}&q=${search}`
    );
    return data;
  } catch (e) {
    console.error(e);
    return {
      error: e,
    };
  }
}

export async function createPatron(email: string): Promise<IPatronCreateView> {
  try {
    const { data } = await axios.post(`${config.API_URL}/patron`, {
      email,
    });
    return data;
  } catch (e) {
    console.error(e);
    return {
      error: e,
    };
  }
}

export async function deletePatron(id: string): Promise<IPatronCreateView> {
  try {
    const { data } = await axios.delete(`${config.API_URL}/patron/${id}`);
    return data;
  } catch (e) {
    console.error(e);
    return {
      error: e,
    };
  }
}
