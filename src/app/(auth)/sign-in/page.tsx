import React from "react";
import SignInForm from "@/components/SignInForm/SignInForm";

const SignIn = () => {
    return <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
            <SignInForm/>
        </div>
    </div>
};

export default SignIn;
