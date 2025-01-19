"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Separator} from "@/components/ui/separator"
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
import {Textarea} from "@/components/ui/textarea"
import {MoveRight, Eye} from 'lucide-react'
import React, {useCallback, useState} from "react"
import * as z from "zod"
import Image from "next/image";

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

export const companyInfoSchema = z.object({
    logo: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .jpeg, and .png formats are supported."
        ),
    banner: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .jpeg, and .png formats are supported."
        ),
    companyName: z
        .string()
        .min(2, {message: "Company name must be at least 2 characters."})
        .max(100, {message: "Company name must not exceed 100 characters."}),
    about: z
        .string()
        .min(10, {message: "About section must be at least 10 characters."})
        .max(500, {message: "About section must not exceed 500 characters."}),
})

export type CompanyInfoFormValues = z.infer<typeof companyInfoSchema>

const CompanyInfoTab = () => {
    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const [bannerPreview, setBannerPreview] = useState<string | null>(null)

    const form = useForm<CompanyInfoFormValues>({
        resolver: zodResolver(companyInfoSchema),
        defaultValues: {
            companyName: "",
            about: "",
        },
    })

    const onSubmit = useCallback(async (data: CompanyInfoFormValues) => {
        const formData = new FormData()
        formData.append('logo', data.logo)
        formData.append('banner', data.banner)
        formData.append('companyName', data.companyName)
        formData.append('about', data.about)

        try {
            // Log the form data
            console.log('Form Data:')
            for (const [key, value] of formData.entries()) {
                console.log(key, value)
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            toast({
                title: "Error",
                description: "Failed to submit form. Please try again.",
                variant: "destructive",
            })
        }
    }, [])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setPreview: (preview: string | null) => void) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const renderImageUpload = (name: "logo" | "banner", label: string, preview: string | null, setPreview: (preview: string | null) => void) => (
        <FormField
            control={form.control}
            name={name}
            render={({field: {onChange,...rest}}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="flex flex-col items-center justify-center w-full">
                            <label
                                htmlFor={`${name}-upload`}
                                className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 hover:border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-950 dark:bg-gray-900 hover:bg-gray-100 transition-all duration-300 dark:border-gray-600 dark:hover:border-gray-800"
                            >
                                {preview ? (
                                    <Image src={preview || "/placeholder.svg"} alt={`${label} preview`}
                                         className="w-full h-full object-cover rounded-lg" height={500} width={500} />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span>
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG up to 5MB</p>
                                    </div>
                                )}
                                <input
                                    id={`${name}-upload`}
                                    type="file"
                                    className="hidden"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            onChange(file)
                                            handleImageChange(e, setPreview)
                                        }
                                    }}
                                    {...rest}
                                    value={undefined}
                                />
                            </label>
                            {preview && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => {
                                        const newWindow = window.open();
                                        if (newWindow) {
                                            newWindow.document.write(`<img src="${preview}" alt="${label} preview" style="max-width: 100%; height: auto;" />`);
                                            newWindow.document.title = `${label} Preview`;
                                        }
                                    }}
                                >
                                    <Eye className="w-4 h-4 mr-2"/> Preview
                                </Button>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}></FormField>
    )

    return (
        <div className="w-full max-w-5xl mx-auto h-full mt-4">
            <div className="p-4 rounded-lg border">
                <div>
                    <h2 className="mb-4 text-lg font-semibold">Company Information</h2>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 gap-3">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                {renderImageUpload("logo", "Upload Logo", logoPreview, setLogoPreview)}
                            </div>
                            <div className="lg:col-span-3">
                                {renderImageUpload("banner", "Upload Banner", bannerPreview, setBannerPreview)}
                            </div>
                        </div>
                        <Separator/>
                        <div>
                            <FormField
                                control={form.control}
                                name="companyName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Company name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Infosys, Wipro" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="about"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>About company</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write down about your company here. Let the candidate know who we are..."
                                                className="resize-none"
                                                rows={4}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full flex items-center">
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded transition-all duration-300 text-white"
                            >
                                Submit
                                <MoveRight size={20} className="text-white ml-2"/>
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CompanyInfoTab

