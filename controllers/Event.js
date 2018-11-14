const axios = require('axios');
var fs = require('fs');

const db = require('../models');
const Event = db.Event;

const storeTeamSchedule = (teamName) => {
    teamId = getTeamId(teamName);

    var url = `http://site.web.api.espn.com/apis/site/v2/sports/football/college-football/teams/${teamId}/schedule?region=us&lang=en&seasontype=2`
    axios.get(url).then((obj) => {
        var events = obj.data.events;
        events.forEach(event => {
            var homeTeam = event.name.replace(new RegExp('.*at '), '');

            Event.create({
                date: event.date,
                name: event.name,
                shortName: event.shortName,
                location: getTeamStadium(homeTeam)
            });
        });
    });
}

const getHomeSchedule = (teamName) => {
    findTeamReg = ".*" + teamName;

    Event.find({
        // Home team
        "name": { $regex: findTeamReg },
        // After current datetime
        "date": { "$lte": Date.now() }
    })
        .then(events => {
            if (!events) return;

            events.forEach(event => {
                console.log(event.shortName);
            })
        })
        .catch(err => { console.log(err); })
}

const getTeamId = (teamName) => {
    var raw_data = fs.readFileSync("./controllers/espnData/basketball_team_ids.json");
    var json_data = JSON.parse(raw_data);

    return json_data[teamName];
}

const getTeamStadium = (teamName) => {
    var raw_data = fs.readFileSync("./controllers/espnData/basketball_stadium_names.json");
    var json_data = JSON.parse(raw_data);

    return json_data[teamName];
}

module.exports = {
    storeTeamSchedule: storeTeamSchedule,
    getHomeSchedule: getHomeSchedule,
    getTeamStadium: getTeamStadium,
}