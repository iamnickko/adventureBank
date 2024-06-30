export const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPasswordValid = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  return passwordRegex.test(password);
};

export const isNameInputValid = (name) => {
  const nameRegex = /^[!-@.\/#&+\w\s]*$/;
  return nameRegex.test(name);
};

export const isDescriptionValid = (description) => {
  const descriptionRegex = /^[!-@.\/#&+\w\s]*$/;
  return descriptionRegex.test(description);
};
