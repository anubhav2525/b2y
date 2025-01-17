import React from "react";
import SignUpForm from "@/components/SignUpForm/SignUpForm";

const SignUp = () => {
    return <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
            <SignUpForm/>
        </div>
    </div>
};

export default SignUp;
