import { BASE_API_URL } from "./constants";
import { JobItemApiResponse, JobItemsApiResponse } from "./types";

export async function fetchActiveJobItem(id: number): Promise<JobItemApiResponse> {
  const res = await fetch(`${BASE_API_URL}/${id}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }

  const data = await res.json();
  return data;
}

export async function fetchJobItems(searchText: string): Promise<JobItemsApiResponse> {
  const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }

  const data = await res.json();
  return data;
}
