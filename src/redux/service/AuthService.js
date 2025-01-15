import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;
export function authHeader() {
  const token = localStorage.getItem("token");
  return { authorization: token || "" };
}

// LOGIN POST REQUEST
async function login(email, password) {
  try {
    const { data } = await axios.post(`${baseURL}/api/auth/login`, {
      email,
      password,
    });

    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("isRole", data.data.role);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("userId", data?.data?._id);
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        e.response?.data?.Error ||
        e.message ||
        "An error occurred"
    );
  }
}

// GOOGLE LOGIN POST REQUEST
async function googleLogin() {
  try {
    const { data } = await axios.post(`${baseURL}/api/auth/google`);

    if (!data.success) {
      throw new Error(data.message || "Google login failed");
    }

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("isAuthenticated", data.success);
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        e.response?.data?.Error ||
        e.message ||
        "Google login error occurred"
    );
  }
}

// FORGOT PASSWORD
async function forgotPassword(email) {
  try {
    const { data } = await axios.post(`${baseURL}/api/auth/forgetPassword`, {
      email,
    });

    if (!data.success) {
      throw new Error(data.message || "Forgot password failed");
    }

    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        e.response?.data?.Error ||
        e.message ||
        "An error occurred during the forgot password process"
    );
  }
}

// VERIFY OTP
async function verifyOTP(email, otp) {
  try {
    const { data } = await axios.post(`${baseURL}/api/auth/verifyOTP`, {
      otp,
      email,
    });

    if (!data.success) {
      throw new Error(data.message || "OTP verification failed");
    }

    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        e.response?.data?.Error ||
        e.message ||
        "OTP verification error occurred"
    );
  }
}

// RESET PASSWORD
async function resetPassword(email, newPassword) {
  try {
    const { data } = await axios.put(`${baseURL}/api/auth/resetPassword`, {
      email,
      newPassword,
    });

    if (!data.success) {
      throw new Error(data.message || "Reset password failed");
    }

    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        e.response?.data?.Error ||
        e.message ||
        "Reset password error occurred"
    );
  }
}

// LOGOUT REQUEST TO API
async function apiLogout() {
  try {
    const { data } = await axios.post(
      `${baseURL}/api/auth/logout`,
      {},
      {
        headers: authHeader(),
      }
    );

    if (!data.success) {
      throw new Error(data.message || "Logout failed");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isRole");
    localStorage.removeItem("userId");

    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        e.response?.data?.Error ||
        e.message ||
        "Logout error occurred"
    );
  }
}

// REFRESH TOKEN
async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const { data } = await axios.post(`${baseURL}/api/auth/refreshToken`, {
      refreshToken: refreshToken,
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to refresh token");
    }

    // Save the new token and refreshToken
    localStorage.setItem("isRole", "");
    localStorage.setItem("token", "");
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message ||
        e.response?.data?.Error ||
        e.message ||
        "Failed to refresh token"
    );
  }
}

// GET USER BY ID
async function getUserById(id) {
  try {
    const { data } = await axios.get(`${baseURL}/api/admin/getUserById/${id}`, {
      headers: authHeader(),
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to get user by ID");
    }
    return data;
  } catch (e) {
    if (e.response?.data?.message === "jwt malformed") {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      window.location.reload();
      throw new Error("Invalid JWT token detected.");
    } else {
      throw new Error(e.message || "An error occurred.");
    }
  }
}

// EXPORT AUTHSERVICE
const AuthService = {
  login,
  verifyOTP,
  apiLogout,
  googleLogin,
  forgotPassword,
  resetPassword,
  refreshToken,
  getUserById,
};

export default AuthService;
