"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {toast} from "@/hooks/use-toast"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Link, MoveRight, Calendar} from "lucide-react";
import React from "react";

const FormSchema = z.object({
    organizationType: z.string({
        required_error: "Please select an organization type.",
    }),
    industryType: z.string({
        required_error: "Please select an industry type.",
    }),
    teamSize: z.string({
        required_error: "Please select a team size.",
    }),
    websiteLink: z.string().url({
        message: "Please enter a valid URL.",
    }),
    companyEstablished: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, {
        message: "Please enter a valid date in the format dd/mm/yyyy.",
    }),
    companyVision: z.string().min(10, {
        message: "Company vision must be at least 10 characters.",
    }).max(500, {
        message: "Company vision must not be longer than 500 characters.",
    }),
})

const CompanyBasicInfo = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            organizationType: "",
            industryType: "",
            teamSize: "",
            websiteLink: "",
            companyEstablished: "",
            companyVision: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })
    }

    return (<div className="w-full max-w-5xl mx-auto h-full mt-4">
            <div className="p-4 rounded-lg border">
                <div><h2 className="mb-4 text-lg font-semibold">Basic Information</h2></div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                          className="w-full grid grid-cols-1 gap-3">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="organizationType"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Organization Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select organization type"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="educational_institution">Educational
                                                        Institution</SelectItem>
                                                    <SelectItem value="startup">Startup</SelectItem>
                                                    <SelectItem value="non_profit">Non-Profit</SelectItem>
                                                    <SelectItem value="government_organization">Government
                                                        Organization</SelectItem>
                                                    <SelectItem value="corporate">Corporate</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="industryType"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Industry Types</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select industry type"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="technology">Technology</SelectItem>
                                                    <SelectItem value="healthcare">Healthcare</SelectItem>
                                                    <SelectItem value="finance">Finance</SelectItem>
                                                    <SelectItem value="retail">Retail</SelectItem>
                                                    <SelectItem value="education">Education</SelectItem>
                                                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="teamSize"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Team Size</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select team size"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1_10">1-10 employees</SelectItem>
                                                    <SelectItem value="11_50">11-50 employees</SelectItem>
                                                    <SelectItem value="51_200">51-200 employees</SelectItem>
                                                    <SelectItem value="201_500">201-500 employees</SelectItem>
                                                    <SelectItem value="500_plus">500+ employees</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid lg:col-span-2"><FormField
                                control={form.control}
                                name="websiteLink"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Website link</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Link
                                                    className="absolute left-3 top-2 h-5 w-5 text-muted-foreground"/>
                                                <Input
                                                    type="url"
                                                    className="pl-10"
                                                    placeholder="Company website"
                                                    {...field}
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
                                    name="companyEstablished"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Company established</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Calendar
                                                        className="absolute left-3 top-2 h-5 w-5 text-muted-foreground"/>
                                                    <Input
                                                        className="pl-10"
                                                        placeholder="dd/mm/yyyy"
                                                        max={10}
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full grid md:col-span-2 lg:col-span-3"><FormField
                                control={form.control}
                                name="companyVision"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Company vision</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us a little bit about yourself"
                                                className="resize-none"
                                                rows={4}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            /></div>
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
export default CompanyBasicInfo
