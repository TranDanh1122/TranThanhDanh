import React from "react"
import CurrencyAPI from "@/api/CurrencyAPI"
export const useCurrency = () => {
    const [currencies, setCurrencies] = React.useState<Currency[]>([])
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CurrencyAPI.fetchCurrency()
                const uniqueArray = response.data.filter((value: Currency, index: number, self: Currency[]) => self.findIndex(el => el.currency == value.currency) === index);
                setCurrencies(uniqueArray)
            } catch (error: unknown) {
                throw new Error((error as string).toString())
            }
        }
        fetchData()
    }, [])
    return { currencies }
}