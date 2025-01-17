"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import FormLoader from "@/components/Loader/FormLoader/FormLoader";
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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";

const FormSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    pin: z.string().min(6, {
        message: "Pin must be at least 6 characters",
    }),
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters",
        })
        .max(50, {
            message: "Password must be at most 50 characters",
        }),
    confirmPassword: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters",
        })
        .max(50, {
            message: "Password must be at most 50 characters",
        }),
});

const ResetPasswordForm = ({email}: { email: string }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: email,
            pin: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log(data);
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
                                        <h1 className="text-2xl font-bold">Update your password</h1>
                                        <p className="text-balance text-muted-foreground">
                                            Enter your new password below
                                        </p>
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="pin"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>One-Time Password</FormLabel>
                                                    <FormControl>
                                                        <InputOTP maxLength={6} {...field}>
                                                            <InputOTPGroup>
                                                                <InputOTPSlot index={0}/>
                                                                <InputOTPSlot index={1}/>
                                                            </InputOTPGroup>
                                                            <InputOTPSeparator/>
                                                            <InputOTPGroup>
                                                                <InputOTPSlot index={2}/>
                                                                <InputOTPSlot index={3}/>
                                                            </InputOTPGroup>
                                                            <InputOTPSeparator/>
                                                            <InputOTPGroup>
                                                                <InputOTPSlot index={4}/>
                                                                <InputOTPSlot index={5}/>
                                                            </InputOTPGroup>
                                                        </InputOTP>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Please enter the one-time password sent to your
                                                        phone.
                                                    </FormDescription>
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
                                                    <FormLabel>New password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="shadcn" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Enter a new password for your account
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Confirm password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="shadcn" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Enter a new password for your account
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
                        </div>
                    </Form>
                    <div className="relative hidden bg-muted md:block">
                        <Image
                            src="/image/signin.png"
                            height={400}
                            width={400}
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover p-6"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ResetPasswordForm;
