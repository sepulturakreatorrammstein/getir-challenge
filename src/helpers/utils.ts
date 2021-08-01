import { IRecord } from "../db/models/record";

class UtilsService {

	constructor() {
		console.log("Utils service started");
	}

	countCalculateFilter = (docs: any, minCount: number, maxCount: number): IRecord[] | Error => {
		if (!docs || !minCount || !maxCount) {
			return new Error(
				"startDate, endDate, minCount and maxCount inputs must be present at the same time!"
			);
		} else {
			const filteredDocs = [];
			for (var i = 0; i < docs.length; i += 1) {
				const countArr = docs[i].counts;
				const sumCount = countArr.reduce((a: any, b: any) => a + b, 0);
				if (sumCount >= minCount && sumCount <= maxCount) {
					filteredDocs.push({
						key: docs[i].key,
						createdAt: docs[i].createdAt,
						totalCount: sumCount,
					});
				}
			}
			return filteredDocs as IRecord[];
		}
	};
}

const utilsService = new UtilsService();
export default utilsService;