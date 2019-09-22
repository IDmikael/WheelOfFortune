// URLs
const BASE_URL = "localhost:3000";
const SCORE_URL = "/score";
const SEGMENTS_URL = "/segments";
const SPIN_URL = "/spin";

function getScore(context, callback){
    let request = cc.loader.getXMLHttpRequest();
    request.open("GET", BASE_URL + SCORE_URL, true);
    request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.response != undefined) {
            let scoreNum = Number(JSON.parse(request.response).score);
            cc.log("GET SCORE: " + scoreNum);
            callback.call(context, scoreNum);
        }
    };
    request.send();
}

function getSegments(context, callback){
    let req = cc.loader.getXMLHttpRequest();
    req.open("GET", BASE_URL + SEGMENTS_URL, true);
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.onreadystatechange = () => {
        if (req.readyState == 4 && req.response != undefined){
            callback.call(context, JSON.parse(req.response).segmentsArray);
        }
    }
    req.send();
}

function spinWheel(context, callback){
    let request = cc.loader.getXMLHttpRequest();
    request.open("POST", BASE_URL + SPIN_URL, true);
    request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.response != undefined) {
            let rand = Number(JSON.parse(request.response).selectedSegment);
            cc.log("returned random: ", rand);
            
            callback.call(context, rand);
        }
    };
    request.send();
}

export default {getScore, getSegments, spinWheel};