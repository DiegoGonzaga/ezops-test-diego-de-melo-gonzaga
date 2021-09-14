const app = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");

describe("POST /messages", function () {
  it("add new message", async () => {
    result = await request(app)
      .post("/messages")
      .send({ name: "A guerra dos 100 anos", message: "Durou 116 anos" })
      .set("Accept", "application/json")
      .expect(200);
  });
});

describe("GET /messages", function () {
  it("Get all messages", async () => {
    await request(app).get("/messages").expect(200);
  });
});

describe("DELETE /messages", function () {
  it("delete selected messages", async () => {
    await request(app).delete("/messages").send({ id: "" }).expect(200);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
