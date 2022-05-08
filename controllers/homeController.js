const BigPromise = require("../middlewares/bigPromise");

//BIG PROMISE WAY
exports.home = BigPromise(async (req, res) => {
	//const db = await something()
	res.status(200).json({
		success: true,
		greeting: "Hello from API",
	});
});


//TRY CATCH WAY
exports.homedummy = async (req, res) => {
	try {
		//const db = await something()

		res.status(200).json({
			success: true,
			greeting: "Hello from API dummy route",
		});
	} catch (error) {
		console.log(error)
	}
};
