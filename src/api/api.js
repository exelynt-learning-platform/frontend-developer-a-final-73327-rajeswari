const BASE_URL = "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    // Some successful DELETE responses may not contain JSON.
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export const employeeApi = {
  getAll: () => request("/employee"),
  getById: (id) => request(`/employee/${encodeURIComponent(id)}`),
  create: (employee) =>
    request("/employee", { method: "POST", body: JSON.stringify(employee) }),
  update: (id, employee) =>
    request(`/employee/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(employee)
    }),
  remove: (id) =>
    request(`/employee/${encodeURIComponent(id)}`, { method: "DELETE" })
};

export const countryApi = {
  getAll: () => request("/country")
};