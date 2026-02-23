import { useCallback, useState } from "react";

const FileUpload = ({ label = "Upload", onChange }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsOver(false);
      const files = Array.from(e.dataTransfer.files || []);
      onChange?.(files);
    },
    [onChange]
  );

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        {label}
      </label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={handleDrop}
        className={
          "border-2 border-dashed rounded-md p-6 text-center " +
          (isOver ? "border-blue-500 bg-blue-50" : "border-neutral-300")
        }
      >
        <div className="flex flex-col items-center gap-2 text-neutral-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M12 16l4-5h-3V4h-2v7H8l4 5z" />
          </svg>
          <p className="text-sm">
            Drag & drop files here, or click to select
          </p>
          <p className="text-xs text-neutral-500">PDF, JPG, PNG up to 10MB</p>
        </div>
        <input
          type="file"
          multiple
          className="sr-only"
          onChange={(e) => onChange?.(Array.from(e.target.files || []))}
        />
      </div>
    </div>
  );
};

export default FileUpload;
