import { ChartBarIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function LoginInfo() {
  return (
    <div className="w-full max-w-md">
      
      {/* LOGO */}
      <div className=" mb-1">
        <img
          src="src\assets\Container.png"
          alt="Government Emblem"
          className="h-26"
        />
       
      </div>

      {/* HEADING */}
      <h1 className="text-6xl font-bold text-[#0F172A] leading-tight">
        Welcome to <br />
        <span className="text-[#4F6DFF]">TSRS Portal</span>
      </h1>

      {/* DESCRIPTION */}
      <p className="mt-4 text-gray-500 text-base">
        Textile Statistical Returns System – Your digital gateway to streamlined
        textile data management
      </p>

      {/* FEATURES */}
      <div className="flex gap-6 mt-10">
        <FeatureCard
          icon={ChartBarIcon}
          title="Real-time Analytics"
          desc="Track compliance instantly"
        />
        <FeatureCard
          icon={ShieldCheckIcon}
          title="Secure & Verified"
          desc="Government-grade security"
        />
      </div>

      {/* FOOTER */}
      <div className="mt-14 text-lg text-gray-400 font-semibold">
        Ministry of Textiles, Government of India
      </div>
      <div className="mt-1 text-xs text-gray-400">
        Copyright © 2017 Government of India, Ministry of Textiles Office  of The Textile Commissioner, Mumbai Textile Statistics Returns System 
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="flex-1 rounded-xl bg-white p-5 shadow-md">
      <div className="flex flex-col gap-2 text-[#1677FF] mb-2">
        <Icon className="h-5 w-5" />

        <h4 className="font-semibold text-black">
          {title}
        </h4>
      </div>

      <p className="text-sm text-gray-600">
        {desc}
      </p>
    </div>
  );
}
