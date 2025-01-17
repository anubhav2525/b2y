"use client"
import {useSearchParams} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import React from "react"
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
import {SidebarTrigger, SidebarProvider} from "@/components/ui/sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import {Slash, CircleUser, AtSign, PhoneCall, Edit, X} from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const FormSchema = z.object({
    id: z.string(),
    lastUpdate: z.string(),
    fullName: z.string(),
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    department: z.string(),
    designation: z.string(),
    status: z.enum(["active", "inactive"]),
})

const CompanyEmployeesEditPage = () => {
    const searchParams = useSearchParams();
    const editable = searchParams.get("editable") === "true"; // Convert string to boolean

    const [isEditing, setIsEditing] = React.useState(editable)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: "",
            lastUpdate: "",
            fullName: "",
            email: "",
            phoneNumber: "",
            department: "HR",
            designation: "",
            status: "active"
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (isEditing) {
            toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
            })
            setIsEditing(false)
        }
    }

    return (
        <SidebarProvider>
            <Dialog>
                <div className="w-full h-full p-4">
                    <div className="flex items-center gap-x-3 mb-3">
                        <div>
                            <SidebarTrigger/>
                        </div>
                        <div>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator>
                                        <Slash/>
                                    </BreadcrumbSeparator>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/employees">Employees</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator>
                                        <Slash/>
                                    </BreadcrumbSeparator>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{!isEditing ? "View" : "Edit"}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div className="max-w-5xl w-full mx-auto rounded-md border p-4">
                        <Form {...form}>
                            <div className="w-full flex justify-between items-center">
                                <h2 className="text-black dark:text-slate-200 font-bold text-xl md:text-2xl">
                                    {!isEditing ? "View" : "Edit"} employee
                                </h2>
                                <Button
                                    onClick={() => setIsEditing(!isEditing)}
                                    variant="outline"
                                >
                                    {isEditing ? <span className="flex gap-2 items-center">
                                        <X className="w-3 h-3 text-white"/>
                                        <span> Cancel</span>
                                    </span> :
                                        <span className="flex gap-2 items-centerl">
                                        <Edit className="w-3 h-3 text-white"/>
                                        <span> Edit</span>
                                    </span>
                                    }
                                </Button>
                            </div>
                            <form onSubmit={form.handleSubmit(onSubmit)}
                                  className="w-full grid grid-cols-1 lg:grid-cols-2 pt-3 gap-4">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="id"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Employee id</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        className={`${!isEditing && "border-none"} disabled:cursor-default`}
                                                        disabled={true}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="lastUpdate"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Last update</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        {...field}
                                                        className={`${!isEditing && "border-none"} disabled:cursor-default`}
                                                        disabled={true}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Full name</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        {
                                                            isEditing && <CircleUser
                                                                className="absolute left-3 top-2 h-5 w-5 text-muted-foreground"/>}
                                                        <Input
                                                            type="text"
                                                            className={`${!isEditing && "border-none !pl-0"} pl-10 disabled:cursor-default`}
                                                            placeholder={`${!isEditing ? "" : "John Deo"}`}
                                                            {...field}
                                                            disabled={!isEditing}
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
                                                <FormLabel>Email address</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        {
                                                            isEditing && <AtSign
                                                                className="absolute left-3 top-2 h-5 w-5 text-muted-foreground"/>}
                                                        <Input
                                                            className={`${!isEditing && "border-none !pl-0"} pl-10 disabled:cursor-default`}
                                                            placeholder={!isEditing ? "" : "john.doe@gmail.com"}
                                                            type="email"
                                                            {...field}
                                                            disabled={!isEditing}
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
                                        name="phoneNumber"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Phone number</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        {
                                                            isEditing &&
                                                            <PhoneCall
                                                                className="absolute left-3 top-2 h-5 w-5 text-muted-foreground"/>}
                                                        <Input
                                                            className={`${!isEditing && "border-none !pl-0"} pl-10 disabled:cursor-default`}
                                                            placeholder={isEditing ? "+1 (555) 000-0000" : ""}
                                                            type="tel"
                                                            {...field}
                                                            disabled={!isEditing}
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
                                        name="department"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Department</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}
                                                        disabled={!isEditing}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a department"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="HR">HR</SelectItem>
                                                        <SelectItem value="IT">IT</SelectItem>
                                                        <SelectItem value="Finance">Finance</SelectItem>
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
                                        name="designation"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Designation</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}
                                                        disabled={!isEditing}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a designation"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="HR Assistant">HR Assistant</SelectItem>
                                                        <SelectItem value="HR Manager">HR Manager</SelectItem>
                                                        <SelectItem value="HR Director">HR Director</SelectItem>
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
                                        name="status"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}
                                                        disabled={!isEditing}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a status"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="inactive">Inactive</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {
                                    isEditing && <div className="w-full grid lg:col-span-2 pt-3">
                                        <div className="flex items-center justify-between">
                                            <Button
                                                type="submit"
                                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded transition-all duration-300 text-white"
                                                disabled={!isEditing}
                                            >
                                                Update
                                            </Button>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive">Delete</Button>
                                            </DialogTrigger>
                                        </div>
                                    </div>
                                }
                            </form>
                        </Form>
                    </div>
                </div>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete this employee</DialogTitle>
                        <DialogDescription>
                            Are you sure do you want to remove this employee?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <Button type="button" variant="destructive">Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    )
}

export default CompanyEmployeesEditPage;