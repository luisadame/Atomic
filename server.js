const express = require('express');
const axios = require('axios');
const convert = require('xml-js');
const cors = require('cors');
const app = express();
const port = 3000;
let options = {
	origin: '*'
};
app.get('/', cors(options), async (req, res) => {
	let url = req.query.url;
	try {
		const {
			data
		} = await axios.get(url);
		res.type('text/xml');
		res.send(data);
	} catch (e) {
		console.error(e);
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
