import React from "react";
import Link from "next/link";

const PopularVacancy = () => {
    return (
        <div className="w-full h-full px-6 py-10 lg:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto w-full h-full">
                <div className="w-full h-full flex flex-col gap-4">
                    <div>
                        <h1 className="text-black dark:text-white text-3xl lg:text-5xl font-bold">
                            Most Popular Vacancies
                        </h1>
                    </div>
                    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href={""}>
                            <VacancyList title="Developer" count="1233"/>
                        </Link>
                        <Link href={""}>
                            <VacancyList title="Developer" count="1233"/>
                        </Link>
                        <Link href={""}>
                            <VacancyList title="Developer" count="1233"/>
                        </Link><Link href={""}>
                        <VacancyList title="Developer" count="1233"/>
                    </Link><Link href={""}>
                        <VacancyList title="Developer" count="1233"/>
                    </Link><Link href={""}>
                        <VacancyList title="Developer" count="1233"/>
                    </Link><Link href={""}>
                        <VacancyList title="Developer" count="1233"/>
                    </Link><Link href={""}>
                        <VacancyList title="Developer" count="1233"/>
                    </Link><Link href={""}>
                        <VacancyList title="Developer" count="1233"/>
                    </Link><Link href={""}>
                        <VacancyList title="Developer" count="1233"/>
                    </Link>
                        <Link href={""}>
                            <VacancyList title="Developer" count="1233"/>
                        </Link>
                        <Link href={""}>
                            <VacancyList title="Developer" count="1233"/>
                        </Link>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularVacancy;

const VacancyList = ({title, count}: { title: string; count: string }) => {
    return (
        <div
            className="flex flex-col gap-1 px-4 py-2 rounded-lg hover:shadow-md hover:border hover:border-blue-600 transition-all">
            <div className="font-bold text-base md:text-xl text-black dark:text-slate-200">
                {title}
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500">
                {count} Open Positions
            </div>
        </div>
    );
};
