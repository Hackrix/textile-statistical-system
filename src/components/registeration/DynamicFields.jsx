import Select from "react-select";
import FileUpload from "./FileUpload";

const Field = ({ field, value, onChange, error, touched }) => {
  const { label, fieldType, placeholder, requiredField, options = [] } = field;

  const common = {
    className:
      "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
    placeholder: placeholder || label,
    value: value ?? "",
    onChange: (e) => onChange?.(e.target.value),
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1">
        {label} {requiredField && <span className="text-red-600">*</span>}
      </label>
      {fieldType === "text" && <input type="text" {...common} />}
      {fieldType === "number" && <input type="number" {...common} />}
      {fieldType === "radio" && (
        <div className="flex flex-wrap gap-3">
          {(options || []).map((opt) => {
            const val = typeof opt === 'string' ? opt : (opt.value ?? opt.label);
            const lbl = typeof opt === 'string' ? opt : (opt.label ?? opt.value);
            return (
            <label key={lbl} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name={label}
                className="accent-blue-600"
                checked={value === val}
                onChange={() => onChange?.(val)}
              />
              <span>{lbl}</span>
            </label>
          );})}
        </div>
      )}
      {fieldType === "select" && (
        <Select
          options={(options || []).map((o) => (typeof o === 'string' ? ({ value: o, label: o }) : o))}
          value={value ? (typeof value === 'object' ? value : { value, label: String(value) }) : null}
          onChange={(opt) => onChange?.(opt?.value ?? opt)}
          styles={{
            control: (base) => ({ ...base, borderColor: "#d1d5db", boxShadow: "none" }),
          }}
        />
      )}
      {fieldType === "fileUpload" && (
        <FileUpload label={label} onChange={(files) => onChange?.(files)} />
      )}
      {touched && error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

const DynamicFields = ({ sections = [], formik, formData, setFormData }) => {
  return (
    <div className="space-y-8">
      {sections.map((section, idx) => (
        <div key={idx}>
          {section.heading && (
            <h3 className="text-base font-semibold text-neutral-900 mb-3">
              {section.heading}
            </h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.fields.map((f) => (
              <Field
                key={f.label}
                field={f}
                value={formik ? formik.values[f.label] : formData[f.label]}
                onChange={(val) => (formik ? formik.setFieldValue(f.label, val) : setFormData((prev) => ({ ...prev, [f.label]: val })))}
                error={formik ? formik.errors[f.label] : undefined}
                touched={formik ? formik.touched[f.label] : false}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicFields;
