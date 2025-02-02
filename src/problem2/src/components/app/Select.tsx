import React from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";

interface SelectProps {
    currencies: Currency[],
    name: string,
    selected?: string,
    onChange?: (value: string | number, name: string) => void
}
const Select = React.memo(({ currencies, name, selected, onChange }: SelectProps): React.JSX.Element => {
    const [open, setOpen] = React.useState(false)
    console.log(`re-render select_${name}`);

    return <>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between focus-visible:ring-0 font-bold text-[#280d5f] border-2 border-[#280d5f]/50">
                    {currencies.some(el => el.currency === selected) ? selected : "Select Currency..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-white border-none rounded-2xl shadow-2xl">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList >
                        <CommandEmpty>No currency found...</CommandEmpty>
                        <CommandGroup>
                            {currencies.map((currency, index) => (
                                <CommandItem
                                    className="font-bold  text-[#280d5f] hover:bg-[#21c8d5]/50"
                                    key={`${currency.currency}_${index}`}
                                    value={currency.currency}
                                    onSelect={(value: string) => {
                                        onChange?.(value, name)
                                        onChange?.(currency.price, `${name}_compareUSDT`)
                                        setOpen(false)
                                    }}>
                                    {currency.currency}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selected === currency.currency ? "opacity-100" : "opacity-0"
                                        )} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    </>
})
Select.displayName = "Select"
export default Select