const BASE_URL = "/api/matches";

export const getAllMatches = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch matches");
  return response.json();
};

export const getMatchById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch match ${id}`);
  return response.json();
};

export const getMatchesByVenueId = async (venueId) => {
  const response = await fetch(`/api/venues/${venueId}/matches`);
  if (!response.ok) throw new Error(`Failed to fetch matches for venue ${venueId}`);
  return response.json();
};
