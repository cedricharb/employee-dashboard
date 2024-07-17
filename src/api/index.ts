import axios from "axios";
import { Employee } from "../lib/types/employee";

const API_URL = "https://randomuser.me/api/";

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        results: 99,
      },
    });

    return response.data.results.map((user: any) => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      title: user.name.title,
      department: "General",
      location: `${user.location.city}, ${user.location.country}`,
      picture: user.picture.thumbnail,
    }));
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};
