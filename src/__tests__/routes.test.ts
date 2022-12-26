import app from "../server";
import request from "supertest";

describe("sign-in", () => {
  it("should be able to sign in", async () => {
    const res = await request(app)
      .post("/sign-in")
      .send({ username: "admin", password: "admin" })
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toEqual(200);
  });
});
