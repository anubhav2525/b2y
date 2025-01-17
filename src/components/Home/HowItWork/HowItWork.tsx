import React from "react";
import {
  Search,
  UserPlus,
  CloudUpload,
  CircleCheckBig,
  MoveRight,
} from "lucide-react";

const HowItWork = () => {
  return (
    <div className="w-full h-full px-6 py-10 lg:py-20 ">
      <div className="max-w-7xl mx-auto w-full h-full">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold text-black dark:text-slate-200">
              How it works?
            </h1>
          </div>
          <div className="w-full h-full grid md:grid-cols-2 xl:grid-cols-4">
            <ProcessCard
              tickVisible={true}
              icon={
                <UserPlus
                  size={30}
                  className="text-blue-500 group-hover:text-white transition-all duration-300"
                />
              }
              title="Create account"
              subTitle="Lorem ipsum dolor sit amet consectetur."
            />
            <ProcessCard
              tickVisible={true}
              icon={
                <CloudUpload
                  size={30}
                  className="text-blue-500 group-hover:text-white transition-all duration-300"
                />
              }
              title="Upload CV/Resume"
              subTitle="Lorem ipsum dolor sit amet consectetur."
            />
            <ProcessCard
              tickVisible={true}
              icon={
                <Search
                  size={30}
                  className="text-blue-500 group-hover:text-white transition-all duration-300"
                />
              }
              title="Find suitable job"
              subTitle="Lorem ipsum dolor sit amet consectetur."
            />
            <ProcessCard
              tickVisible={false}
              icon={
                <CircleCheckBig
                  size={30}
                  className="text-blue-500 group-hover:text-white transition-all duration-300"
                />
              }
              title="Apply job"
              subTitle="Lorem ipsum dolor sit amet consectetur."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;

const ProcessCard = ({
  tickVisible,
  icon,
  title,
  subTitle,
}: {
  tickVisible?: boolean;
  icon: React.ReactNode;
  title: string;
  subTitle?: string;
}) => {
  return (
    <div className="w-full h-full group">
      <div className="flex flex-col p-6 items-center gap-4 w-full h-full group-hover:bg-white dark:group-hover:bg-slate-900 rounded-sm transition-all duration-300">
        <div>
          <div className="bg-white rounded-full p-4 group-hover:bg-blue-500 transition-all duration-300">
            {icon}
          </div>
        </div>
        <div className="flex flex-col justify-between items-center gap-3">
          <div className="text-xl font-bold dark:text-white text-black ">
            {title}
          </div>
          <div className="text-center dark:text-slate-300 text-slate-600 text-sm">
            {subTitle}
          </div>
          {tickVisible && (
            <div className="flex w-full justify-end">
              <MoveRight size={20} className="text-black dark:text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
