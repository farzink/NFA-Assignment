import * as endpoints from '../endpoints'
import axios from 'axios';

export const GET_CRIMES_ACTION = "GET_CRIMES_ACTION";
export const GET_TEAMS_ACTION = "GET_TEAMS_ACTION";
export const UPDATE_TOP_CRIMES_FOR_TEAM_ACTION = "UPDATE_TOP_CRIMES_FOR_TEAM_ACTION";
export const REQUEST_BEGIN = "REQUEST_BEGIN";
export const REQUEST_END = "REQUEST_END";

const beginRequest = () => {
    return {
        type: REQUEST_BEGIN
    }
}

const endRequest = () => {
    return {
        type: REQUEST_END
    }
}

export const getCrimes = (extra = null) => {
    return ds => {
        ds(beginRequest());
        axios.get(endpoints.createUrlFor(endpoints.GET_CRIMES)).then(success => {
            ds({
                type: GET_CRIMES_ACTION,
                payload: success.data
            })
            ds(endRequest());
            if (extra) { extra() }
        }).catch(error => {
            ds(endRequest());
        })
    }
}

export const getTeams = (extra = null) => {
    return ds => {
        ds(beginRequest());
        axios.get(endpoints.createUrlFor(endpoints.GET_TEAMS)).then(success => {
            ds({
                type: GET_TEAMS_ACTION,
                payload: success.data
            })
            ds(endRequest());
            if (extra) { extra() }
        }).catch(error => {
            ds(endRequest());
        })
    }
}


export const getTopCrimesForTeam = (team, extra = null) => {
    return ds => {
        ds(beginRequest());
        axios.get(endpoints.createUrlFor(`${endpoints.GET_TOP_CRIMES_FOR_TEAM}/${team}`)).then(success => {
            ds({
                type: UPDATE_TOP_CRIMES_FOR_TEAM_ACTION,
                payload: {
                    team: team,
                    data: success.data
                }
            })

            ds(endRequest());
            if (extra) { extra() }
        }).catch(error => {
            ds(endRequest());
        })

    }
}


export const getTopCrimesForTeams = (teams, extra = null) => {
    return ds => {
        ds(beginRequest());
        const calls = []
        for (let team of teams) {
            calls.push(new Promise((resolve, reject) => {
                axios.get(endpoints.createUrlFor(`${endpoints.GET_TOP_CRIMES_FOR_TEAM}/${team}`)).then(success => {
                    ds({
                        type: UPDATE_TOP_CRIMES_FOR_TEAM_ACTION,
                        payload: {
                            team: team,
                            data: success.data
                        }
                    })
                    ds(endRequest());                    
                    resolve()
                }).catch(error => {
                    ds(endRequest());
                    reject()
                })
            }))
        }

        Promise.all(calls).then(success => {
            if (extra) { extra() }
        })
    }
}


