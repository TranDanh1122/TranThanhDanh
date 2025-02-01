import axios from "axios";
const client = axios.create({
    baseURL: "https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/",
    timeout: 3000
})
const SVGAPI = {
    getSVGByName: (name : string) => client.get(`${name}.svg`)
}
export default SVGAPI