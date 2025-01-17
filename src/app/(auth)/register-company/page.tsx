import React from 'react'
import RegisterCompanyForm from "@/components/RegisterCompanyForm/RegisterCompanyForm";

const RegisterCompanyPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <RegisterCompanyForm/>
            </div>
        </div>

    )
}
export default RegisterCompanyPage
