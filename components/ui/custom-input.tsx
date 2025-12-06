import React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import { Input } from "./input";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "./select"
interface CustomInputProps {
    type: "input" | "select" | "switch" | "radio" | "textarea";
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    inputType?: "text" | "email" | "password" | "date" | "number";
    selectList?: { label: string; value: string }[];
    defaultValue?: string | boolean;
}
const RenderInput = ({ field, props}: {field: any; props: CustomInputProps}) => {
    switch (props.type) {
        case "input":
            return (
                <FormControl>
                    <Input 
                    type={props.inputType} 
                    placeholder={props.placeholder} 
                    {...field} 
                    />
                </FormControl>
            );
            case "select":
            return (
                <Select onValueChange={field.onChange} value={field?.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={props.placeholder}/>
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {props.selectList?.map((i, id) => (
                            <SelectItem key={id} value={i.value}>
                                {i.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
    }
};

export const CustomInput = (props: CustomInputProps) => {
    const {name, label, control, type} = props;

    return (
        <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className="w-full">
                {type !=="radio" && type !== "checkbox" && (
                    <FormLabel>{label}</FormLabel>
            )}
            <RenderInput field={field} props={props} /> {}
            </FormItem>
    )}
        />
    );
};