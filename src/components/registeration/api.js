// Environment configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const ENABLE_DEBUG = import.meta.env.VITE_ENABLE_DEBUG === 'true';

// Helper to log API calls in debug mode
const debugLog = (...args) => {
  if (ENABLE_DEBUG) {
    console.log('[API Debug]', ...args);
  }
};

// Simulated API response per step (replace with real backend calls)

export const fetchStepConfig = async (stepIndex) => {
  debugLog(`Fetching config for step ${stepIndex} from ${API_BASE_URL}`);
  
  // In real use, replace with:
  // const response = await fetch(`${API_BASE_URL}/registration/config?step=${stepIndex}`);
  // if (!response.ok) throw new Error('Failed to fetch step config');
  // return await response.json();
  
  const common = (label, type, placeholder, required = false, options = []) => ({
    label,
    fieldType: type,
    placeholder,
    requiredField: required,
    options,
  });

  if (stepIndex === 0) {
    return {
      projectName: "Kairo",
      sections: [
        {
          heading: "Entity Information",
          fields: [
            common("First Name", "text", "First Name", true),
            common("Last Name", "text", "Last Name", true),
            common("Unit Type", "select", "Select unit type", true, ["Spinning", "Weaving", "Processing"]),
            common("Employees", "number", "Total employees"),
          ],
        },
        {
          heading: "Location",
          fields: [
            common("State", "select", "Select state", true, ["Gujarat", "Maharashtra", "Tamil Nadu"]),
            common("City", "text", "City"),
            common("Pincode", "number", "Pincode"),
            common("Ownership", "radio", "", false, ["Proprietorship", "Partnership", "Company"]),
          ],
        },
      ],
    };
  }

  if (stepIndex === 1) {
    return {
      projectName: "Kairo",
      sections: [
        {
          heading: "Documents",
          fields: [
            common("PAN Card", "fileUpload", ""),
            common("Registration Certificate", "fileUpload", ""),
            common("Address Proof", "fileUpload", ""),
            common("GSTIN Details", "fileUpload", ""),
          ],
        },
      ],
    };
  }

  return {
    projectName: "Kairo",
    sections: [
      {
        heading: "Contact Person",
        fields: [
          common("Full Name", "text", "Full Name", true),
          common("Email", "text", "Email", true),
          common("Phone", "number", "Phone", true),
          common("Role", "select", "Select role", false, ["Owner", "Manager", "Operator"]),
        ],
      },
    ],
  };
};
