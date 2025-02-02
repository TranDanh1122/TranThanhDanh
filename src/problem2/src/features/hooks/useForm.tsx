import React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "../../hooks/use-toast"
import SVGAPI from "@/api/SVGAPI"
const formSchema = z.object({
    from: z.coerce.string().min(1, "Currency is required"),
    from_compareUSDT: z.coerce.number(),
    to: z.coerce.string().min(1, "Currency is required"),
    to_compareUSDT: z.coerce.number(),
    from_amount: z.coerce.number({
        message: "Invalid amount"
    }).gt(0, "Amount must be greater than 0"),
    to_amount: z.coerce.number({
        message: "Invalid amount"
    })
})
export type FormType = z.infer<typeof formSchema>
export const useFormHook = () => {
    const { toast } = useToast()
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
    const watcher = form.watch(["from", "to"])
    React.useEffect(() => {
        if (!form.formState.isValid) return
        const fromPrice = form.getValues("from_compareUSDT")
        const toPrice = form.getValues("to_compareUSDT")
        const exchangeRate = fromPrice / toPrice
        const toValue = form.getValues("from_amount") / exchangeRate
        form.setValue("to_amount", toValue)
    }, [watcher, form.watch("from_amount")])

    const handleChange = React.useCallback((value: string | number, name: string) => {
        const key = name as keyof z.infer<typeof formSchema>
        form.setValue(key, value)
        form.trigger(key);
    }, [])
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        toast({
            description: "Currency swapped, let check you wallet",
        })
        console.log(data);
        
    }
    const swap = () => {
        const fromPrice = form.getValues("from_compareUSDT")
        const toPrice = form.getValues("to_compareUSDT")
        const from = form.getValues("from")
        const to = form.getValues("to")
        form.setValue("to", from)
        form.setValue("from", to)
        form.setValue("from_compareUSDT", toPrice)
        form.setValue("to_compareUSDT", fromPrice)
    }
    return { form, handleChange, onSubmit, swap }
}