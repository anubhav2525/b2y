"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {toast} from "@/hooks/use-toast";
import FormLoader from "@/components/Loader/FormLoader/FormLoader"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import React from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

const FormSchema = z.object({
    email: z
        .string()
        .min(2, {
            message: "Email minimum length is 2 characters",
        })
        .max(50, {
            message: "Email maximum length is 50 characters",
        })
        .email({
            message: "Invalid email address",
        }),
    password: z
        .string()
        .min(8, {
            message: "Password minimum length is 8 characters",
        })
        .max(50, {
            message: "Password maximum length is 50 characters",
        }),
    role: z.enum(["user", "admin"]),
    status: z.enum(["active", "inactive"]),
});

const RegisterCompanyForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            role: "user",
            status: "active",
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        toast({
            title: "You submitted the following values:",
            description: "",
        });
    };
    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <div className="p-6 md:p-8">
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold">
                                            Register your company
                                        </h1>
                                        <p className="text-balance text-muted-foreground">
                                            Sign up to continue
                                        </p>
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Company email address</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="indeed@gmail.com"
                                                            type="email"
                                                            {...field}
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
                                            name="password"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="********"
                                                            type="password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Button type="submit"
                                                className="w-full text-white bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600">
                                            {form.formState.isSubmitting ? <FormLoader/> : "Register"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                            <div className="flex flex-col gap-4 mt-6">
                                <div
                                    className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                </div>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link
                                        href="/sign-in"
                                        className="underline underline-offset-4"
                                    >
                                        Sign in
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Form>
                    <div className="relative hidden bg-muted md:block">
                        <Image
                            src="/image/signin.png"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover p-6"
                            height={400}
                            width={400}
                        />
                    </div>
                </CardContent>
            </Card>
            <div
                className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our{" "}
                <Link href="#">Terms of Service</Link> and{" "}
                <Link href="#">Privacy Policy</Link>
            </div>
        </div>
    )
}
export default RegisterCompanyForm
