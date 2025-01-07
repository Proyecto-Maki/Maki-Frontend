function generateRandomAlphaNumericCode(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

// Exportar un valor adicional llamado randomValue
export const randomValue = generateRandomAlphaNumericCode();

// Exportar la función como default
export default generateRandomAlphaNumericCode;
