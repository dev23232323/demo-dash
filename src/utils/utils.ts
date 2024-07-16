import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`,
  timeout: 60000, // 60 seconds
});

// Request interceptor to set Content-Type for different types of data
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if request data is FormData
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      // For other data types (e.g., JSON), Axios will automatically set Content-Type to application/json
      delete config.headers["Content-Type"]; // Remove Content-Type if not FormData
    }

    // Add Authorization header if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

export function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

export function stripEmptyHtmlTags(input: string): string {
  // Define the regular expression pattern to match any element with no content, excluding iframe
  const regex = /<(?!iframe\b)(\w+)(?:\s+[^>]*)?><\/\1>/g;
  // Replace occurrences of <element></element> with an empty string
  return input.replace(regex, "").trim();
  // Pass the filtered content to the onChange function
}

export function isValidUrl(input: string): boolean {
  const regex =
    /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
  return regex.test(input);
}

export function getBase64Image(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject("No file found at index 0.");
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result && typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("Failed to convert file to base64.");
      }
    };
    reader.onerror = () => {
      reject("Error reading file.");
    };

    reader.readAsDataURL(file);
  });
}
