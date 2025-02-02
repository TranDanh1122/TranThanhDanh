import axios from "axios"
const client = axios.create({
    baseURL: "https://interview.switcheo.com",
    timeout: 3000
})
const CurrencyAPI = {
    fetchCurrency: () => client.get("/prices.json")
}
export default CurrencyAPI