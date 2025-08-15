export const validateAadhaar = (aadhaar: string): boolean => {
  // Check if Aadhaar number is exactly 12 digits
  return /^\d{12}$/.test(aadhaar);
};

export const validatePAN = (pan: string): boolean => {
  // Check if PAN matches the format: 5 uppercase letters + 4 numbers + 1 uppercase letter
  return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
};

export const formatAadhaar = (aadhaar: string): string => {
  // Format Aadhaar number as XXXX-XXXX-XXXX
  return aadhaar.replace(/(\d{4})/g, "$1-").slice(0, -1);
};

export const formatPAN = (pan: string): string => {
  // Return PAN in uppercase
  return pan.toUpperCase();
};
