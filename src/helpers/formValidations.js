const SUCCESS = undefined;

export const isRequired = (value) => {
  const FAILURE = "Es requerido";

  if (!value) return FAILURE;

  return SUCCESS;
};
