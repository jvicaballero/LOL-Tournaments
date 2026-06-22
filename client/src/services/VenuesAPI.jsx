const BASE_URL = "/api/venues";

export const getVenues = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch venues");
  return response.json();
};

export const getVenueById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch venue ${id}`);
  return response.json();
};
