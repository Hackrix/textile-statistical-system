import { useEffect, useMemo, useState } from "react";
import Stepper from "./Stepper";
import DynamicFields from "./DynamicFields";
import RightPanel from "./RightPanel";
import { fetchStepConfig } from "./api";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegistrationPage = () => {
  const [current, setCurrent] = useState(0);
  const [config, setConfig] = useState({ sections: [] });
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchStepConfig(current);
      setConfig(data);
      setLoading(false);
    })();
  }, [current]);

  const validationSchema = useMemo(() => {
    const shape = {};
    (config.sections || []).forEach((sec) => {
      (sec.fields || []).forEach((f) => {
        let rule;
        if (f.fieldType === "number") rule = Yup.number().typeError("Must be a number");
        else if (f.label.toLowerCase().includes("email")) rule = Yup.string().email("Invalid email");
        else rule = Yup.string();
        if (f.requiredField) rule = rule.required("Required");
        shape[f.label] = rule;
      });
    });
    return Yup.object().shape(shape);
  }, [config]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema,
    onSubmit: () => {},
  });

  const next = async () => {
    const errors = await formik.validateForm();
    // only consider fields in current step
    const stepFieldLabels = (config.sections || []).flatMap((s) => (s.fields || []).map((f) => f.label));
    const stepErrors = Object.keys(errors || {}).filter((k) => stepFieldLabels.includes(k));
    if (stepErrors.length === 0) {
      setFormData((prev) => ({ ...prev, ...formik.values }));
      setCurrent((c) => Math.min(2, c + 1));
    } else {
      formik.setTouched(stepFieldLabels.reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    }
  };
  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const cancel = () => {
    setCurrent(0);
    setFormData({});
    window.location.hash = "";
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">TSRS Registration</h1>
        <p className="text-sm text-neutral-600">Complete your textile unit registration</p>
      </header>

      {/* Stepper */}
      <div className="mb-6">
        <Stepper current={current} />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 2/3 width form */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-neutral-200 p-4">
            {loading ? (
              <div className="text-sm text-neutral-600">Loading form…</div>
            ) : (
              <DynamicFields sections={config.sections} formik={formik} />
            )}
          </div>

          {/* Navigation buttons */}
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex gap-3">
              <button
                type="button"
                className="rounded px-4 py-2 text-sm font-medium border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, ...formik.values }));
                  console.log("Draft saved", { ...formData, ...formik.values });
                }}
              >
                Save as Draft
              </button>
              <button
                type="button"
                className="rounded px-4 py-2 text-sm font-medium border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                onClick={cancel}
              >
                Cancel
              </button>
            </div>
            <div className="flex gap-3 justify-end">
              {current > 0 && (
                <button
                  type="button"
                  className="rounded px-4 py-2 text-sm font-medium border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                  onClick={prev}
                >
                  Back
                </button>
              )}
              <button
                type="button"
                className="rounded px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                onClick={next}
              >
                {current < 2 ? "Next" : "Finish"}
              </button>
            </div>
          </div>
        </div>

        {/* Right: 1/3 width panel */}
        <div>
          <RightPanel />
        </div>
      </div>
    </section>
  );
};

export default RegistrationPage;
