"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {toast} from "@/hooks/use-toast";
import FormLoader from "@/components/Loader/FormLoader/FormLoader"
import {
    Form,
    FormControl,
    FormDescription,
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
});

const ForgetPasswordForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log(data)
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
                                        <h1 className="text-2xl font-bold">Forget your password</h1>
                                        <p className="text-balance text-muted-foreground">
                                            Recover your account
                                        </p>
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Email address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="shadcn" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Enter the email address associated with your account
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600">
                                            {form.formState.isSubmitting ? <FormLoader/> : "Submit"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                            <div className="flex flex-col gap-4 mt-6">
                                <div className="text-center text-sm">
                                    Try to login again?{" "}
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
                            height={400}
                            width={400}
                            className="absolute inset-0 h-full w-full object-cover p-6"
                        />
                    </div>
                </CardContent>
            </Card>
            <div
                className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
};

export default ForgetPasswordForm;
