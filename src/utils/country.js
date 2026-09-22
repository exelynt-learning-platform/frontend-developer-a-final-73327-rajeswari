export function getCountryName(country) {
  if (country == null) return "—";
  if (typeof country === "string") return country || "—";
  return country.name || country.countryName || country.title || country.label || country.country || "—";
}

export function getCountryId(country) {
  if (country == null) return "";
  if (typeof country === "string") return country;
  return country.id ?? country.name ?? country.countryName ?? "";
}