import React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
const formSchema = z.object({
    from: z.coerce.string(),
    from_compareUSDT: z.coerce.number(),
    to: z.coerce.string(),
    to_compareUSDT: z.coerce.number(),
    from_amount: z.coerce.number({
        message: "Invalid amount"
    }),
    to_amount: z.coerce.number({
        message: "Invalid amount"
    })
})
export type FormType = z.infer<typeof formSchema>
export const useFormHook = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            from: "",
            from_compareUSDT: 0.00,
            to: "",
            to_compareUSDT: 0.00,
            from_amount: 0.00,
            to_amount: 0.00
        },
        mode: "onChange"
    })
    const watcher = form.watch(["from", "to", "from_amount"])
    React.useEffect(() => {
        if (!form.formState.isValid) return
        const fromPrice = form.getValues("from_compareUSDT")
        const toPrice = form.getValues("to_compareUSDT")
        const exchangeRate = fromPrice / toPrice
        const toValue = form.getValues("from_amount") / exchangeRate
        form.setValue("to_amount", toValue)
    }, [watcher])
    const handleChange = React.useCallback((value: string | number, name: string) => {
        form.setValue(name as keyof z.infer<typeof formSchema>, value)
    }, [])
    return { form, handleChange }
}