import React from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { FormType } from "@/features/hooks/useForm";
interface InputFCProps {
    control: Control<FormType>,
    name: string,
    label: string,
    placeholder: string,
    readOnly?: boolean,
}
const InputFC = React.memo(({ control, name, label, placeholder, readOnly }: InputFCProps): React.JSX.Element => {
    console.log(`re-render input_${name}`);

    return <FormField
        control={control}
        name={name as keyof FormType}
        render={({ field }) => (
            <FormItem className="gap-2 flex flex-col">
                <FormLabel className="text-[#280d5f] font-bold">{label}</FormLabel>
                <FormControl>
                    <>
                        <NumericFormat
                            value={field.value}
                            readOnly={readOnly}
                            placeholder={placeholder}
                            className="focus-visible:ring-0 font-bold text-[#280d5f] border-2 border-[#280d5f]/50"
                            thousandSeparator=","
                            allowNegative={false}
                            onValueChange={(values) => {
                                const value = Number(values.value.trim())
                                field.onChange(value)
                            }}
                            customInput={Input}
                        />
                    </>
                </FormControl>

                <FormMessage className="text-red-600" />
            </FormItem>
        )}
    />
})
InputFC.displayName = "InputFC"
export default InputFC