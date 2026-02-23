const steps = [
	{
		number: 1,
		title: "Register",
		description: "Complete one-time registration and get verified",
	},
	{
		number: 2,
		title: "Submit ASR",
		description: "Annual Structure Return establishes your unit baseline",
	},
	{
		number: 3,
		title: "Submit MSR",
		description: "Monthly Statistical Returns track your production",
	},
	{
		number: 4,
		title: "Stay Compliant",
		description: "Monitor compliance and receive real-time alerts",
	},
];

const stats = [
	{ value: "12,458", label: "Registered Units" },
	{ value: "94.9%", label: "Active Units" },
	{ value: "92.3%", label: "ASR Compliance" },
	{ value: "88.7%", label: "MSR Compliance" },
];

const HowItWorks = () => {
	return (
		<section aria-label="Process flow and statistics" className="w-full">
			{/* Top Section – Process Flow (default white background) */}
			<div className="bg-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
					<h1 className="text-center text-4xl font-medium text-neutral-900">How it Works</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-[60px]">
						{steps.map((s) => (
							<div key={s.number} className="rounded-lg p-5">
								<div className="flex flex-col items-center text-center gap-3">
									{/* Circular gradient icon with step number */}
									<div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 grid place-items-center text-white shadow-sm">
										<span className="text-base font-semibold">{s.number}</span>
									</div>
									<h3 className="text-neutral-900 text-lg font-semibold">{s.title}</h3>
									<p className="text-sm text-neutral-600">{s.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Bottom Section – Statistics Bar */}
			<div className="bg-blue-700">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
						{stats.map((stat, idx) => (
							<div key={idx} className="text-white">
								<div className="text-2xl sm:text-3xl font-semibold">{stat.value}</div>
								<div className="mt-1 text-xs sm:text-sm text-white/90">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;

