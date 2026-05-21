export const validarISO6346 = (containerCode: string): boolean => {
  const regex = /^[A-Z]{4}[0-9]{7}$/; // validación del ISO 6346
  return regex.test(containerCode);
};