import axios from 'axios'

const useCountry = async (name) => {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'
    const res = await axios.get(`${baseUrl}/${name}`)
    try {
        const name = res.name.common
        const capital = res.capital[0]
        const population = res.population
        const flag = res.flags.png
        return {
            name, 
            capital, 
            population, 
            flag
        }
    }
    catch (exception) {
        return undefined
    }
}

export default useCountry