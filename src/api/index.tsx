import axios from 'axios';

const url = 'https://covid19.mathdro.id/api'

export const fetchDailyData = async() => {

    try {
        const { data } = await axios.get(`${url}/daily`);

        const modifiedData = data.map(dailyData => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData;
    } catch (error) {
        throw Error (error);
    }

}

export const fetchCountriesData  = async () => {

    try {
        const { data: {Global: {TotalConfirmed, TotalDeaths, TotalRecovered }, Countries}} = await axios.get(`https://api.covid19api.com/summary`);
        
        // eslint-disable-next-line 
        const sortedCountries = Countries.sort((a,b)=> {
            if (a['TotalConfirmed'] < b['TotalConfirmed'])  return 1;
            if (a['TotalConfirmed'] > b['TotalConfirmed'])  return -1;

        })

       return {sortedCountries,TotalConfirmed, TotalDeaths, TotalRecovered };
    }
    catch (error) {
        throw Error (error);
    }
}
