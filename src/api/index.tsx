import axios from 'axios';

export const fetchDailyData = async() => {

    try {
        const { data } = await axios.get(`https://covid19.mathdro.id/api/daily`);

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

export const fetchCountryDailyData = async (country:string) => {
    try {
        const {data} = await axios.get(`https://api.covid19api.com/total/dayone/country/${country}`);
        const modifiedData = data.map(dailyData => ({
            confirmed: dailyData.Confirmed,
            deaths: dailyData.Deaths,
            date: dailyData.Date,
        }))
        return modifiedData;
    }catch {

    }
}