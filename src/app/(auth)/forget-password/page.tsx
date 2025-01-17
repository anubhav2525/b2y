import React from "react";
import ForgetPasswordForm from "@/components/ForgetPasswordForm/ForgetPasswordForm";

const ForgetPassword = () => {
    return <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
            <ForgetPasswordForm/>
        </div>
    </div>
        ;
};

export default ForgetPassword;
