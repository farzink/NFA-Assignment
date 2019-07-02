import { REQUEST_BEGIN, REQUEST_END, GET_CRIMES_ACTION, GET_TEAMS_ACTION, UPDATE_TOP_CRIMES_FOR_TEAM_ACTION } from "../actions/crime-actions";



export const crimeReducer = (state = {
    crime: {
        data: [],
        requestStatus: false,
        isFetched: false
    },
    team: {
        data: [],
        requestStatus: false,
        isFetched: false
    },
    requestStatus: false,
    isFetched: false
}, action) => {
    switch (action.type) {
        case REQUEST_BEGIN:
            return Object.assign({}, state, { requestStatus: true })
        case REQUEST_END:
            return Object.assign({}, state, { requestStatus: false })

        case GET_CRIMES_ACTION:
            return Object.assign({}, state, {
                crime: {
                    ...state.crime,
                    data: action.payload.map(crime => {
                        return crime
                    }),
                    isFetched: true
                }
            })

        case GET_TEAMS_ACTION:
            return Object.assign({}, state, {
                team: {
                    ...state.team,
                    data: action.payload.map(t => {
                        t.topCrimes = []
                        t.state = states[t.Team_city]
                        return t
                    })
                },
                isFetched: true
            }
            )

        case UPDATE_TOP_CRIMES_FOR_TEAM_ACTION:
            return Object.assign({}, state, {
                team: {
                    ...state.team,
                    data: state.team.data.map(t => {
                        if (t.Team === action.payload.team) {
                            t.topCrimes = action.payload.data
                        }
                        return t
                    })
                }
            })

        default: return state;
    }
}

export const states = {
    "Denver": 'Colorado',
    "Minneapolis": 'Minnesota',
    "Cincinnati": 'Ohio',
    "Jacksonville": 'Florida',
    "Tampa Bay": 'Florida',
    "Nashville": 'Tennessee',
    "Cleveland": 'Ohio',
    "Indianapolis": 'Indiana',
    "Kansas City": 'Missouri',
    "Chicago": 'Illinois',
    "Miami": 'Florida',
    "Seattle": 'Washington',
    "San Francisco": 'California',
    "Baltimore": 'Mariland',
    "Los Angeles": 'California',    
    "New Orleans": 'Louisiana',
    "Green Bay": 'wisconsin',
    "Pittsburgh": 'Pennsylvania',
    "New York": 'New York',
    "Phoenix": 'Arizona',
    "Oakland": 'California',
    "Washington DC": 'Washington DC',
    "Dallas": 'Texas',
    "Charlotte": 'North Carolina',
    "Buffalo": 'New York',
    "Boston": 'Massachusetts',
    "Atlanta": 'Georgia',
    "Philadelphia": 'Pennsylvania',
    "Detroit": 'Michigan',
    "Houston": 'Texas',
}