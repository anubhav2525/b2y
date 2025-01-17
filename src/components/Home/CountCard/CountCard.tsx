import React from "react";
import AnimatedCountUp from "../AnimatedCountUp/AnimatedCountUp";

type CardProps = {
    logo: React.ReactNode;
    cardName: string;
    total: number;
};

const CountCard = ({logo, cardName, total}: CardProps) => {
    return (
        <div
            className="bg-white dark:border border-slate-700 dark:bg-neutral-900 flex gap-3 px-6 py-5 hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-lg transition-all duration-200 group shadow-md dark:shadow-slate-950">
            <div
                className="flex items-center justify-center py-3 px-4 bg-sky-200 dark:bg-sky-600 dark:group-hover:bg-sky-700 group-hover:bg-sky-400 rounded-sm transition-all duration-200">
                {logo}
            </div>
            <div className="flex flex-col justify-center">
                <div className="text-base tracking-widest font-bold">
                    <AnimatedCountUp countUpFrom={0} countUpTo={total} duration={2}/>
                </div>
                <div className="text-xs dark:text-slate-400 tracking-wider text-slate-900">
                    {cardName}
                </div>
            </div>
        </div>
    );
};

export default CountCard;
