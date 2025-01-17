"use client"

import {useFieldArray, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Plus, X, Copy, MoveRight} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    SocialLinksForm,
    SocialLinksFormSchema,
    socialPlatforms,
} from "@/lib/schema/SocialPlatformSchema"
import {toast} from "@/hooks/use-toast";

const CompanySocialTab = () => {
    const form = useForm<SocialLinksForm>({
        resolver: zodResolver(SocialLinksFormSchema),
        defaultValues: {
            links: [{platform: "", url: ""}],
        },
    })

    const {fields, append, remove} = useFieldArray({
        name: "links",
        control: form.control,
    })

    // Get all currently selected platforms
    const selectedPlatforms = form.watch("links").map(link => link.platform).filter(Boolean)

    function onSubmit(data: SocialLinksForm) {
        console.log(data)
        // Handle form submission here
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast({
                title: "Copied!",
                description: "Link copied to clipboard",
            })
        }).catch((err) => {
            console.error('Failed to copy: ', err)
            toast({
                title: "Error",
                description: "Failed to copy link",
                variant: "destructive",
            })
        })
    }

    return (
        <div className="w-full max-w-5xl mx-auto h-full mt-4">
            <div className="rounded-lg border p-4">
                <h2 className="mb-4 text-lg font-semibold">Social Links</h2>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            {fields.map((field, index) => {
                                // Get current field's platform
                                const currentPlatform = form.watch(`links.${index}.platform`)

                                // Filter available platforms
                                const availablePlatforms = socialPlatforms.filter(
                                    platform =>
                                        platform.value === currentPlatform ||
                                        !selectedPlatforms.includes(platform.value)
                                )

                                return (
                                    <div key={field.id}>
                                        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-3">
                                            <div className="w-full grid md:col-span-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`links.${index}.platform`}
                                                    render={({field}) => (
                                                        <FormItem className="md:w-[180px] w-full">
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select platform"/>
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {availablePlatforms.map((platform) => (
                                                                        <SelectItem
                                                                            key={platform.value}
                                                                            value={platform.value}
                                                                        >
                                                                            {platform.label}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="w-full grid md:col-span-10">
                                                <div className="w-full flex items-center gap-3">
                                                    <div className="w-full">
                                                        <FormField
                                                            control={form.control}
                                                            name={`links.${index}.url`}
                                                            render={({field}) => (
                                                                <FormItem className="flex-1">
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Enter the platform url..."
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage/>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <div>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="icon"
                                                                onClick={() => copyToClipboard(form.getValues(`links.${index}.url`))}
                                                                className="h-10 w-10"
                                                            >
                                                                <Copy className="h-4 w-4"/>
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => remove(index)}
                                                                className="h-10 w-10"
                                                            >
                                                                <X className="h-4 w-4"/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="w-full flex justify-end items-center">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => append({platform: "", url: ""})}
                                    disabled={selectedPlatforms.length === socialPlatforms.length}
                                >
                                    <Plus className="mr-2 h-4 w-4"/>
                                    Add Social Link
                                </Button>
                            </div>
                            <div><Button type="submit"
                                         className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded transition-all duration-300 text-white">Submit <MoveRight
                                size={20} className="text-white"/></Button></div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default CompanySocialTab
