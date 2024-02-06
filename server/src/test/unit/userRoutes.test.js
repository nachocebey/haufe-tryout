const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

afterAll(() => mongoose.disconnect());

let userId;

describe("Routes and Controllers Test", () => {
  it("Should create a new user or advert that is already created", async () => {
    const response = await request(app).post("/api/users").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect([200, 409]).toContain(response.statusCode);
  });

  it("Should perform user login", async () => {
    const response = await request(app).post("/api/login").send({
      email: "john@example.com",
      password: "password123",
    });

    userId = response.body.userId;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("message", "Login successful");
  });

  it("Should NOT perform user login - Wrong password", async () => {
    const response = await request(app).post("/api/login").send({
      email: "john@example.com",
      password: "WRONG_PASS",
    });

    expect(response.statusCode).toBe(401);
  });
  it("Should NOT perform user login - Invalid email", async () => {
    const response = await request(app).post("/api/login").send({
      email: "johnny",
      password: "password123",
    });

    expect(response.statusCode).toBe(400);
  });

  it("Should load characters", async () => {
    const response = await request(app).get("/api/characters");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("results");
  });

  it("Should save favorites from user", async () => {
    const response = await request(app).post(`/api/users/${userId}/1`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Character marked as favorite"
    );
  });

  it("Should not save the same favorite character twice but return status 200", async () => {
    await request(app).post(`/api/users/${userId}/1`);
    const response = await request(app).post(`/api/users/${userId}/1`);

    expect(response.statusCode).toBe(200);

    const favoritesResponse = await request(app).get(
      `/api/users/${userId}/favorites`
    );
    const favoritesList = favoritesResponse.body.data;

    expect(favoritesList.length).toBe(1);
  });

  it("Should load favorites from user", async () => {
    const response = await request(app).get(`/api/users/${userId}/favorites`);
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toContain("1");
  });
});
