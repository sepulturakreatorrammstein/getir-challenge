import app from "../src/app";
import request from "supertest";

beforeAll(async () => {
	try {
		await app.init();
	}
	catch (err) {
		console.error("Error booting app: " + err);
		process.exit(2);
	}
});
describe("API Integration Tests", function () {
	describe("#POST /records/data", function () {
		it("should return status 200 and key, created at and totalCount object for given filters", async () => {
			const res = await request(app.app).post("/record").type("json").send({
				"startDate": "2016-01-26",
				"endDate": "2018-02-02",
				"minCount": 2700,
				"maxCount": 3000
			});
			expect(res.statusCode).toEqual(200);
			expect(res.body.status_code).toEqual(0);
			expect(res.body.message).toEqual("Operation Completed");
			expect(res.body.records[0]).toStrictEqual({
				"key": "ibfRLaFT",
				"createdAt": "2016-12-25T16:43:27.909Z",
				"totalCount": 2892
			});
		});
		it("should return status 422 and error message if any of the filter fields absent", async () => {
			const res = await request(app.app).post("/record").type("json").send({
				startDate: "2016-07-06",
				endDate: "2016-07-07",
				minCount: "650",
				// maxCount: "700",
			});
			expect(res.statusCode).toEqual(422);
			expect(res.body.status_code).toEqual(102);
			expect(res.body.message).toEqual('Validation Error!');
			expect(res.body).toHaveProperty("validation_errors");
			expect(res.body.validation_errors.length).toBe(1);
			expect(res.body.validation_errors[0].maxCount).toEqual('"maxCount" is required');
		});
	});
});
