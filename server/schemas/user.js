export const userSchema = {
  name: String,
  email: String,
  password: String,
  favoritesIds: [{ type: String, ref: "Card" }],
};
