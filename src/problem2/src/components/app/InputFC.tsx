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
    readOnly?: boolean
}
const InputFC = React.memo(({ control, name, label, placeholder, readOnly }: InputFCProps): React.JSX.Element => {
    console.log(`re-render input_${name}`);

    return <FormField
        control={control}
        name={name as keyof FormType}
        render={({ field }) => (
            <FormItem className="gap-2 flex flex-col">
                <FormLabel className="text-[#5E7A7D]">{label}</FormLabel>
                <FormControl>
                    <>
                        <NumericFormat
                            value={field.value}
                            readOnly={readOnly}
                            placeholder={placeholder}
                            className="focus-visible:ring-0 "
                            thousandSeparator=","
                            allowNegative={false}
                            prefix="$"
                            onValueChange={(values) => { field.onChange(Number(values.value.trim())) }}
                            customInput={Input}
                        />
                        <Input {...field} name={name} className="hidden" />
                    </>
                </FormControl>

                <FormMessage />
            </FormItem>
        )}
    />
})
InputFC.displayName = "InputFC"
export default InputFC