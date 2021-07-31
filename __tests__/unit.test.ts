import utils from "../src/helpers/utils";

const docs = [
	{ key: "a", counts: [1, 2, 3, 4], createdAt: new Date("2016-01-01") },
	{ key: "b", counts: [1, 2, 3, 5], createdAt: new Date("2016-01-02") },
	{ key: "c", counts: [1, 2, 3, 6], createdAt: new Date("2016-01-03") },
];
describe("API Unit tests", () => {
	it("should return summed counts of array elements ", () => {
		const result = utils.countCalculateFilter(docs, 1, 13);
		expect(result).toEqual([
			{ key: "a", createdAt: new Date("2016-01-01"), totalCount: 10 },
			{ key: "b", createdAt: new Date("2016-01-02"), totalCount: 11 },
			{ key: "c", createdAt: new Date("2016-01-03"), totalCount: 12 },
		]);
	});

	it("should filter the elements according to total count filters", () => {
		const result = utils.countCalculateFilter(docs, 11, 11);
		expect(result).toEqual([
			{ key: "b", createdAt: new Date("2016-01-02"), totalCount: 11 },
		]);
	});

	it("should return if any of the input parameter is absent!", () => {
		expect(utils.countCalculateFilter(docs, 11, undefined)).toStrictEqual(
			new Error(
				"startDate, endDate, minCount and maxCount inputs must be present at the same time!"
			)
		);
	});
});
