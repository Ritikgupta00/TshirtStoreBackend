//base - Producr.find()
//base - Producr.find(email: {"hitesh@lco.dev"})

//bigQ - //search=coder$page=2&category=shortssleeves&rating[gte]=4
//$price[lte]=999$price[gte]=199&limit=5

class WhereClause {
	constructor(base, bigQ) {
		this.base = base;
		this.bigQ = bigQ;
	}

	search() {
		const searchWord = this.bigQ.search
			? {
					name: {
						$reges: this.bigQ.search,
						$potions: "i",
					},
			  }
			: {};

		this.base = this.base.find({ ...searchWord });
		return this;
	}

	filter() {
		const copyQ = { ...this.bigQ };

		delete copyQ["search"];
		delete copyQ["limit"];
		delete copyQ["page"];

		//convert copyQ/bigQ into a string
		let stringOfCopyQ = JSON.stringify(copyQ);

		stringOfCopyQ = stringOfCopyQ.replace(
			/\b(gte|lte|gt|lt)\b/g,
			(m) => `$${m}`
		);

		const jsonOfCopyQ = JSON.parse(stringOfCopyQ);

		this.base = this.base.find(jsonOfCopyQ);
        return this;
	}

	pager(resultperPage) {
		let currentPage = 1;
		if (this.bigQ.page) {
			currentPage = this.bigQ.page;
		}

		const skipVal = resultperPage * (currentPage - 1);

		this.base = this.base.limit(resultperPage).skip(skipVal);
		return this;
	}
}

module.exports = WhereClause;
