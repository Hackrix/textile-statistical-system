const steps = ["Entity Details", "Documents", "Contact Person"];

const Stepper = ({ current }) => {
  return (
    <div className="relative">
      {/* Connector line behind circles */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-neutral-200 z-0" />
      <ol className="relative z-10 grid grid-cols-3 gap-4">
        {steps.map((label, idx) => {
          const active = idx === current;
          const done = idx < current;
          return (
            <li key={label} className="flex items-center gap-3">
              <div
                className={
                  "h-10 w-10 rounded-full grid place-items-center text-sm font-semibold border bg-white " +
                  (active
                    ? "border-blue-600 text-blue-600"
                    : done
                    ? "border-green-600 text-green-600"
                    : "border-neutral-300 text-neutral-400")
                }
              >
                {idx + 1}
              </div>
              <div className="text-sm">
                <div className="font-medium text-neutral-900">{label}</div>
                <div className="text-neutral-500">
                  {active ? "In progress" : done ? "Completed" : "Pending"}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Stepper;
