"use client";

import React, {useEffect} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Mail, MapPin, MoveRight} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {countries} from "@/lib/constants/countries";
import {z} from "zod";

const FormSchema = z.object({
    address: z.string().min(10, {message: "Address min length 10"}).max(100, {message: "Address max length 100"}),
    countryCode: z.string().length(2, {message: "Country code must be 2 characters"}),
    phone: z.string(),
    email: z.string().email()
})

const CompanyContactTab = () => {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            address: "",
            countryCode: "IN",
            phone: "",
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

    async function onSubmit(values: { address: string; countryCode: string; phone: string; email: string }) {
        console.log(values);
    }

    function formatPhoneNumber(phone: string, countryCode: string) {
        const country = countries.find((c) => c.code === countryCode);
        if (!country) return phone;

        // Trim phone to allowed digits
        return phone.replace(/\D/g, "").slice(0, country.phoneLength);
    }

    return (
        <div className="w-full max-w-5xl mx-auto h-full mt-4">
            <div className="rounded-lg border p-4">
                <h2 className="mb-4 text-lg font-semibold">Contacts</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 gap-3">
                        <div>
                            <FormField
                                control={form.control}
                                name="address"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <MapPin
                                                    className="absolute left-3 top-2 h-5 w-5 text-muted-foreground"/>
                                                <Input
                                                    className="pl-10"
                                                    placeholder="Enter location"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
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
                                                                        <span
                                                                            className="font-medium">{country.dial_code}</span>
                                                                                <span
                                                                                    className="text-muted-foreground text-sm ml-2">{country.name}</span>
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
                                                        onChange={(e) => {
                                                            const formattedPhone = formatPhoneNumber(
                                                                e.target.value,
                                                                watchCountryCode
                                                            );
                                                            field.onChange(formattedPhone);
                                                        }}
                                                        maxLength={
                                                            countries.find((c) => c.code === watchCountryCode)
                                                                ?.phoneLength || 15
                                                        }
                                                        type="tel"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Company Email</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail
                                                        className="absolute left-3 top-2 h-5 w-5 text-muted-foreground"/>
                                                    <Input
                                                        className="pl-10"
                                                        placeholder="Email address"
                                                        type="email"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="w-full flex items-center">
                            <Button type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded transition-all duration-300 text-white">Submit <MoveRight
                                size={20} className="text-white"/></Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
export default CompanyContactTab


