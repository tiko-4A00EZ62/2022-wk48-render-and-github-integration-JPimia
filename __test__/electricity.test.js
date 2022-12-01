const { describe, expect, test } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");

// Describe the test set
describe("GET electricity endpoint", () => {
    // The test that is being done
    test("should return 200", (done) => {
        request(app)
            .get("/api/electricity") // Endpoint that is being tested
            .expect(200) // Verify the expected result
            .end(done); // Informing that the test is done
    });

    test("should return valid JSON", async () => {
        const response = await request(app)
            .get("/api/electricity")
            .set("Accept", "application/json");

        expect(response.status).toEqual(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    cost: 233.33,
                    created: "2022-11-23T08:34:50.000Z",
                    id: 1,
                    month: "2022-01-14T22:00:00.000Z",
                    usage: 2345.12,
                }),
                expect.objectContaining({
                    cost: 192.22,
                    created: "2022-11-23T08:34:50.000Z",
                    id: 2,
                    month: "2022-02-14T22:00:00.000Z",
                    usage: 1923.233,
                }),
                expect.objectContaining({
                    cost: 150.22,
                    created: "2022-11-23T08:34:50.000Z",
                    id: 3,
                    month: "2022-03-14T22:00:00.000Z",
                    usage: 1523.233,
                }),
            ])
        );
    });

    test("should return 1 electricity", async () => {
        const response = await request(app)
            .get("/api/electricity/2")
            .set("Accept", "application/json");

        expect(response.status).toEqual(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toEqual(
            expect.objectContaining({
                cost: 192.22,
                created: "2022-11-23T08:34:50.000Z",
                id: 2,
                month: "2022-02-14T22:00:00.000Z",
                usage: 1923.233,
            })
        );
    });

    test("should return 404 and Not Found", async () => {
        const response = await request(app).get("/api/electricity/101");

        expect(response.status).toEqual(404);
        expect(response.text).toContain("Not Found");
    });
});

describe("POST electricity endpoint", () => {
    test("should create a new electricity", async () => {
        const electricity = {
            cost: 192.22,
            month: "2022-02-14T22:00:00.000Z",
            usage: 1923.233,
        };

        const response = await request(app)
            .post("/api/electricity")
            .set("Accept", "application/json")
            .send(electricity);
        console.log(response.body);
        expect(response.status).toEqual(201);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.cost).toBeTruthy();
        expect(response.body.month).toEqual("2022-02-14T22:00:00.000Z");
        expect(response.body.usage).toEqual(1923.233);
    });
});
