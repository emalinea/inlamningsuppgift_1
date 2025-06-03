const request = require("supertest");
const server = require("../../server");


jest.mock("../../database");
const database = require("../../database");

const { beforeEach } = require("node:test");

describe("User routes", function() {

    beforeEach(function() {
        jest.clearAllMocks();
    })

    test("GET /users returns list of users", async function() {
        const fakeUsers = [
            { name: "Lisa", nickname: "L", age: 30, bio: "Dog lover"},
            { name: "Anna", nickname: "A", age: 28, bio: "Cat lover"}
        ]; 
        database.getAllUsers.mockImplementation(function (callback){
            callback(null, fakeUsers);
    });         

    const response = await request(server).get("/Users");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Lisa");
    expect(response.text).toContain("Anna");

});

    test("POST /Users creates a user and returns updated list", async function () {
    const fakePostResult = [
      { name: "Bella", nickname: "B", age: 20, bio: "Hamster lover"},
      { name: "Sara", nickname: "S", age: 25, bio: "Bird lover"},
    ];

    
    database.createUsers.mockImplementation((name, nickname, age, bio, callback) => {
      callback(null, fakePostResult);
    });

    const response = await request(app)
      .post("/users")
      .send("name=Bella&nickname=B&age=20&bio=Hamster lover")
      .send("name=Sara&nickname=S&age=25&bio=Bird lover");

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Bella");
    expect(response.text).toContain("Sara");
  });

  
  test("POST /Users deletes a user and returns updated list", async function () {
    const fakePostResult = [
      { name: "Bella", nickname: "B", age: 20, bio: "Hamster lover"},
      { name: "Sara", nickname: "S", age: 25, bio: "Bird lover"},
    ];

   
    database.deleteUser.mockImplementation((name, nickname, age, bio, callback) => {
      callback(null, fakePostResult);
    });

    const response = await request(app)
      .post("/users")
      .send("name=Bella&nickname=B&age=20&bio=Hamster lover")
      .send("name=Sara&nickname=S&age=25&bio=Bird lover");

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Bella");
    expect(response.text).toContain("Sara");
  });


  test("POST /Users edit a user and returns updated list", async function () {
    const fakePostResult = [
      { name: "Bella", nickname: "B", age: 20, bio: "Hamster lover"},
      { name: "Sara", nickname: "S", age: 25, bio: "Bird lover"},
    ];

    
    database.editUser.mockImplementation((name, nickname, age, bio, callback) => {
      callback(null, fakePostResult);
    });

    const response = await request(app)
      .post("/users")
      .send("name=Bella&nickname=B&age=20&bio=Hamster lover")
      .send("name=Sara&nickname=S&age=25&bio=Bird lover");

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Bella");
    expect(response.text).toContain("Sara");
  });



});
