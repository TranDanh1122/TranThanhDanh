import React from "react"

import { Form, FormMessage } from "@/components/ui/form"
import Select from "@/components/app/Select"
import InputFC from "@/components/app/InputFC"
import { useFormHook } from "./hooks/useForm"
import { useCurrency } from "./hooks/useFetch"
import rightArrow from "../assets/right-arrow.svg"
import { Button } from "@/components/ui/button"
import swapIcon from "../assets/swap.svg"
const FormFC = (): React.JSX.Element => {
    const { form, handleChange, onSubmit, swap } = useFormHook()
    const { currencies } = useCurrency()
    const ref = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        const element = ref.current;
        if (!element) return
        const handleMouseAction = (rotate: number) => {
            const deg = rotate + (window.innerWidth > 767 ? 0 : 90)
            element.style.rotate = `${deg}deg`
        };
        element.addEventListener("mouseenter", () => handleMouseAction(180))
        element.addEventListener("mouseleave", () => handleMouseAction(0))
        return () => {
            element.removeEventListener("mouseenter", () => handleMouseAction(180))
            element.removeEventListener("mouseleave", () => handleMouseAction(0))
        }
    }, [])
    return <Form  {...form}>
        <form onSubmit={form.handleSubmit((data) => onSubmit(data), (errors) => { console.log(errors) })}>
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">
                <div className="md:w-3/7 w-full p-6 flex flex-col gap-4 bg-[#eeeaf4] rounded-2xl">
                    <fieldset className="flex flex-col gap-2">
                        <label htmlFor="from" className="text-[#280d5f] font-bold">From Coin</label>
                        <Select currencies={currencies} selected={form.watch("from")} name="from" onChange={handleChange} />
                        {form.formState.errors.from && (<FormMessage className="text-red-600">{form.formState.errors.from.message}</FormMessage>)}

                    </fieldset>
                    <InputFC label="Amount to send" placeholder="Amount to send..." name="from_amount" control={form.control} />
                </div>
                <div className="w-full md:w-1/7 flex items-center justify-center">
                    <div ref={ref} onClick={swap} className="w-12 h-12 rotate-90 md:rotate-0  rounded-full  bg-[#21c8d5] cursor-pointer transition-transform duration-300 ease-linear">
                        <img src={rightArrow} alt="" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="w-full md:w-3/7 p-6 flex flex-col gap-4 bg-[#eeeaf4] rounded-2xl">
                    <fieldset className="flex flex-col gap-2">
                        <label htmlFor="to" className="text-[#280d5f] font-bold">To Coin</label>
                        <Select currencies={currencies} selected={form.watch("to")} name="to" onChange={handleChange} />
                        {form.formState.errors.to && (<FormMessage className="text-red-600">{form.formState.errors.to.message}</FormMessage>)}
                    </fieldset>
                    <InputFC readOnly={true} label="Amount to receive" placeholder="Amount to receive..." name="to_amount" control={form.control} />
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <Button type="submit" className="bg-[#21c8d5] text-white font-bold w-2/3 md:w-1/3 cursor-pointer hover:opacity-70" >
                    <i className="w-4 h-4 bg-white"
                        style={{
                            mask: `url("${swapIcon}") center / cover no-repeat`,
                            WebkitMask: `url("${swapIcon}") center / cover no-repeat`
                        }}>

                    </i>
                    Swap Coin
                </Button>
            </div>


        </form>
    </Form>
}
export default FormFC