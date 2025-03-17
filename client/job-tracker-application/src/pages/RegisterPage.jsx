import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import InputField from "../components/InputField";
import Loader from "../components/loader";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Role: "Employee",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { FirstName, LastName, Email, Password, Role } = formData;

    if (!FirstName || !LastName || !Email || !Password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const res = await authService.register({
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        password: Password,
        role: Role,
      });

      if (res.success) {
        toast.success("Registration successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="First Name"
            type="text"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
          />
          <InputField
            label="Last Name"
            type="text"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Role</label>
            <select
              name="Role"
              value={formData.Role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Employee">Employee</option>
              <option value="Employer">Employer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-4 p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? <Loader /> : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
