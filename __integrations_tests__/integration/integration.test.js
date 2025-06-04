const request = require("supertest");
const { app, server } = require("../../server");

jest.mock("../../database");
const db = require("../../database");

afterAll((done) => {
  server.close(done);
});

describe("User routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET / returns list of users", async () => {
    const fakeUsers = [
      { name: "Lisa", nickname: "L", age: 30, bio: "Dog lover" },
      { name: "Anna", nickname: "A", age: 28, bio: "Cat lover" },
    ];
    db.getAllUsers.mockResolvedValue(fakeUsers);

    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Lisa");
    expect(response.text).toContain("Anna");
  });

  test("POST /create creates a user", async () => {
    db.addUser.mockResolvedValue();

    const response = await request(app)
      .post("/create")
      .type("form")
      .send({
        name: "Bella",
        nickname: "B",
        age: 20,
        bio: "Hamster lover",
      });

    expect(response.statusCode).toBe(302);
    expect(db.addUser).toHaveBeenCalledWith({
      name: "Bella",
      nickname: "B",
      age: 20,
      bio: "Hamster lover",
    });
  });

  test("POST /users/:id/delete deletes a user", async () => {
    db.deleteUser.mockResolvedValue();

    const response = await request(app).post("/users/1/delete");

    expect(db.deleteUser).toHaveBeenCalledWith("1");
    expect(response.statusCode).toBe(302);
  });

  test("POST /edit updates a user", async () => {
    db.updateUser.mockResolvedValue();

    const response = await request(app)
      .post("/edit")
      .type("form")
      .send({
        id: "1",
        name: "Updated",
        nickname: "U",
        age: 35,
        bio: "Updated bio",
      });

    expect(db.updateUser).toHaveBeenCalledWith("1", {
      name: "Updated",
      nickname: "U",
      age: 35,
      bio: "Updated bio",
    });
    expect(response.statusCode).toBe(302);
  });
});