let express = require('express');
let port = 3000;
let app = express()

let score = require("./routes/score");
let segments = require("./routes/segments");
let spin = require("./routes/spin");

app.route("/score")
	.get(score.getScore);
app.route("/segments")
	.get(segments.getSegments);
app.route("/spin")
	.post(spin.postSpin);


app.use((err, request, response, next) => {
    // логирование ошибки, пока просто console.log
    console.log(err)
    response.status(500).send('Something broke!')
})

app.listen(port)
console.log("Listening on port: " + port);
module.exports = app;