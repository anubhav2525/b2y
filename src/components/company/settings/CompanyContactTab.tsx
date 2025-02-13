"use client";

import React, {useEffect} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {MoveRight} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {countries} from "@/lib/constants/countries";
import {z} from "zod";

interface ContactFormProps {
    address: {
        street: string;
        city: string;
        state: string;
        landMark: string;
        country: string;
        pinCode: string;
    };
    countryCode: string;
    phone: string;
    landline: string;
    email: string;
}

const FormSchema = z.object({
    address: z.object({
        street: z.string().min(10, {message: "Street must be at least 10 characters."}),
        city: z.string().min(2, {message: "City must be at least 2 characters."}),
        state: z.string().min(2, {message: "State must be at least 2 characters."}),
        landMark: z.string().optional(),
        country: z.string().min(2, {message: "Country must be selected."}),
        pinCode: z
            .string()
            .regex(/^\d{5,6}$/, {message: "Pin code must be 5 or 6 digits."}),
    }),
    countryCode: z
        .string()
        .length(2, {message: "Country code must be 2 characters."}),
    phone: z
        .string()
        .regex(/^\d{10}$/, {message: "Phone number must be 10 digits."}),
    landline: z
        .string()
        .regex(/^\d{8,12}$/, {message: "Landline must be 8 to 12 digits."})
        .optional(),
    email: z.string().email({message: "Invalid email address."}),
});

const CompanyContactTab = () => {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            address: {
                street: "",
                city: "",
                state: "",
                landMark: "",
                country: "",
                pinCode: "",
            },
            countryCode: "IN",
            phone: "",
            landline: "",
            email: "",
        },
    });

    const watchCountryCode = form.watch("countryCode");

    useEffect(() => {
        const phoneValue = form.getValues("phone");
        if (phoneValue) {
            const formattedPhone = formatPhoneNumber(phoneValue, watchCountryCode);
            form.setValue("phone", formattedPhone);
        }
    }, [watchCountryCode, form]);

    async function onSubmit(values: ContactFormProps) {
        console.log(values);
    }

    function formatPhoneNumber(phone: string, countryCode: string) {
        const country = countries.find((c) => c.code === countryCode);
        if (!country) return phone;

        return phone.replace(/\D/g, "").slice(0, country.phoneLength);
    }

    return (
        <div className="w-full max-w-5xl mx-auto h-full mt-4">
            <div className="rounded-lg border p-4">
                <h2 className="mb-4 text-lg font-semibold">Contacts address & phone</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 gap-3">
                        {/* Address Section */}
                        <FormField
                            control={form.control}
                            name="address.street"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Street</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter street" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="address.city"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter city" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address.state"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter state" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="address.landMark"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Landmark</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Optional landmark" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address.pinCode"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Pin Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter pin code" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Country Code and Phone */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <div className="relative flex gap-2">
                                                <Controller
                                                    name="countryCode"
                                                    control={form.control}
                                                    render={({field: countryField}) => (
                                                        <Select
                                                            onValueChange={countryField.onChange}
                                                            defaultValue={countryField.value}
                                                        >
                                                            <SelectTrigger className="w-[120px]">
                                                                <SelectValue placeholder="Code"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <ScrollArea className="h-[200px]">
                                                                    {countries.map((country) => (
                                                                        <SelectItem key={country.code}
                                                                                    value={country.code}>
                                      <span className="font-medium">
                                        {country.dial_code}
                                      </span>
                                                                            <span
                                                                                className="text-muted-foreground text-sm ml-2">
                                        {country.name}
                                      </span>
                                                                        </SelectItem>
                                                                    ))}
                                                                </ScrollArea>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                                <Input
                                                    className="flex-1"
                                                    placeholder="Phone number..."
                                                    {...field}
                                                    maxLength={
                                                        countries.find((c) => c.code === watchCountryCode)?.phoneLength || 15
                                                    }
                                                    type="tel"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="landline"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Landline</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Optional landline" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter email address" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="w-full flex items-center">
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded transition-all duration-300 text-white"
                            >
                                Submit <MoveRight size={20} className="text-white"/>
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CompanyContactTab;
