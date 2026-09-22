export const FIELD_LIMITS = {
  name: { min: 2, max: 80 },
  email: { min: 5, max: 120 },
  mobile: { min: 7, max: 15 },
  country: { min: 2, max: 60 },
  state: { min: 2, max: 60 },
  district: { min: 2, max: 60 }
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9+\-\s()]+$/;

export function validateEmployee(values) {
  const errors = {};
  const requiredFields = ["name", "email", "mobile", "country", "state", "district"];

  for (const field of requiredFields) {
    const value = String(values[field] ?? "").trim();
    if (!value) errors[field] = "This field is required.";
  }

  if (values.name?.trim()) {
    if (values.name.trim().length < FIELD_LIMITS.name.min)
      errors.name = `Name must be at least ${FIELD_LIMITS.name.min} characters.`;
    else if (values.name.trim().length > FIELD_LIMITS.name.max)
      errors.name = `Name must be ${FIELD_LIMITS.name.max} characters or fewer.`;
  }

  if (values.email?.trim()) {
    if (!emailRegex.test(values.email.trim()))
      errors.email = "Enter a valid email address.";
    else if (values.email.trim().length > FIELD_LIMITS.email.max)
      errors.email = `Email must be ${FIELD_LIMITS.email.max} characters or fewer.`;
  }

  if (values.mobile?.trim()) {
    const mobile = values.mobile.trim();
    if (!mobileRegex.test(mobile) || mobile.replace(/\D/g, "").length < 7) {
      errors.mobile = "Enter a valid mobile number.";
    } else if (mobile.length > FIELD_LIMITS.mobile.max) {
      errors.mobile = `Mobile must be ${FIELD_LIMITS.mobile.max} characters or fewer.`;
    }
  }

  for (const field of ["country", "state", "district"]) {
    const value = String(values[field] ?? "").trim();
    if (value && value.length < FIELD_LIMITS[field].min)
      errors[field] = `${field[0].toUpperCase() + field.slice(1)} must be at least ${FIELD_LIMITS[field].min} characters.`;
    else if (value && value.length > FIELD_LIMITS[field].max)
      errors[field] = `${field[0].toUpperCase() + field.slice(1)} must be ${FIELD_LIMITS[field].max} characters or fewer.`;
  }

  return errors;
}