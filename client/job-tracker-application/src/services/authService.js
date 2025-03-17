import axios from "axios";

const API_URL = "http://localhost:5112/api/auth";

const login = async (formData) => {
  try {
    console.log("🚀 Sending request to:", `${API_URL}/login`);
    console.log("📌 Payload:", formData);

    const res = await axios.post(`${API_URL}/login`, formData);

    console.log("✅ API Response:", res.data);

    return { success: true, ...res.data };
  } catch (err) {
    console.error(
      "🔥 Login error:",
      err.response?.data || "Server error occurred"
    );

    // Force consistent error structure
    const errorMessage =
      err.response?.data?.message ||
      err.response?.data ||
      "Invalid email or password.";

    return { success: false, message: errorMessage };
  }
};

// export default { login };

const register = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, formData);

    console.log("✅ Register Response:", res.data);

    if (res.data.success) {
      return { success: true, message: "Registration successful!" };
    }

    return {
      success: false,
      message: res.data.message || "Registration failed",
    };
  } catch (err) {
    console.error("🔥 Registration error:", err);

    return {
      success: false,
      message: err.response?.data?.message || "Server error occurred",
    };
  }
};

//Will do later not fully functional till now
// const logout = async () => {
//   try {
//     const refreshToken = localStorage.getItem("refreshToken");
//     await axios.post(`${API_URL}/logout`, { refreshToken });

//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//     console.log("🚀 User logged out successfully");
//   } catch (err) {
//     console.error("🔥 Logout error:", err.response?.data || "Failed to logout");
//   }
// };

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export default {
  login,
  register,
  // logout,
  getCurrentUser,
};
