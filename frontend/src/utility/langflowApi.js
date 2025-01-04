import api from "./api";

const LANGFLOW_ID = import.meta.env.VITE_LANG_FLOW_ID;
const FLOW_ID = import.meta.env.VITE_FLOW_ID;

const runFlow = async (message) => {
  const apiUrl = `/lf/${LANGFLOW_ID}/api/v1/run/${FLOW_ID}`;
  const payload = {
    input_value: message,
    output_type: "chat",
    input_type: "chat",
  };

  try {
    const response = await api.post(apiUrl, payload);
    return response.data;
  } catch (error) {
    console.error(
      "Error running flow:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default runFlow;
