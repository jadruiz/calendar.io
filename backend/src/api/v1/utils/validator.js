// Function to validate email addresses
const isValidEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

// Function to validate that a string is not empty
const isNotEmpty = (string) => {
  return string.trim().length > 0;
};

// Function to validate the length of a string
const isValidLength = (string, { min = 0, max = Number.MAX_SAFE_INTEGER }) => {
  const length = string.trim().length;
  return length >= min && length <= max;
};

// Function to validate that a text contains only alphanumeric characters
const isAlphanumeric = (string) => {
  const re = /^[a-z0-9]+$/i;
  return re.test(string);
};

module.exports = {
  isValidEmail,
  isNotEmpty,
  isValidLength,
  isAlphanumeric,
};
