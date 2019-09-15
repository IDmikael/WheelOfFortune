const db = require('../db/db');

function postSpin(req, res) {
    //Сделать запрос в базу и, если неn ошибок, отдать spin number
    var selectedSegment = Math.round( Math.random() * 15);
    db.getSegments((segments) => {
        db.updateScore(segments[selectedSegment]);

        console.log("Selected segment: ", selectedSegment);

        res.status(200).json({selectedSegment});
    });
}

module.exports = {postSpin};