const API_BASE_URL = "http://localhost:8080/api";

export const apiService = async (
  method = "GET",
  endpoint,
  body = null,
  customHeaders
) => {
  const url = `${API_BASE_URL}/${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw { message: data.error, status: response.status };
    }

    return { data, status: response.status };
  } catch (error) {
    if (error.status) {
      throw error;
    } else {
      throw {
        message: error.message || "Error processing the request",
        status: 500,
      };
    }
  }
};
