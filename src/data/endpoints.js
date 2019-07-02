const base = "http://nflarrest.com/api/v1/"

export const GET_CRIMES = "crime";
export const GET_TEAMS = "team";
export const GET_TOP_CRIMES_FOR_TEAM = "team/topCrimes";


export const createUrlFor = (url) => {
    return `${base}${url}`
}
