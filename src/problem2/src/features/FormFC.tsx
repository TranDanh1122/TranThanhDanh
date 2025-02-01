import React from "react"

import { Form } from "@/components/ui/form"
import Select from "@/components/app/Select"
import InputFC from "@/components/app/InputFC"
import { useFormHook } from "./hooks/useForm"
import { useCurrency } from "./hooks/useFetch"
const FormFC = (): React.JSX.Element => {
    const { form, handleChange } = useFormHook()
    const { currencies } = useCurrency()
    return <Form  {...form}>
        <form className="flex items-center justify-between">
            <div className="w-3/7 p-6 flex flex-col gap-4">
                <fieldset className="flex flex-col gap-2">
                    <label htmlFor="from" className="text-[#5E7A7D] font-semibold">From Coin</label>
                    <Select currencies={currencies} selected={form.watch("from")} name="from" onChange={handleChange} />
                </fieldset>
                <InputFC label="Amount to send" placeholder="Amount to send..." name="from_amount" control={form.control} />
            </div>
            <div className="w-1/7">

            </div>
            <div className="w-3/7 p-6 flex flex-col gap-4">
                <fieldset className="flex flex-col gap-2">
                    <label htmlFor="to" className="text-[#5E7A7D] font-semibold">To Coin</label>
                    <Select currencies={currencies} selected={form.watch("to")} name="to" onChange={handleChange} />
                </fieldset>
                <InputFC readOnly={true} label="Amount to receive" placeholder="Amount to receive..." name="to_amount" control={form.control} />
            </div>
        </form>

    </Form>
}
export default FormFC