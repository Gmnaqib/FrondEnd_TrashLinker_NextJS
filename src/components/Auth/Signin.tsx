import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signin = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!data.email || !data.password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    const isValidEmail = /\S+@\S+\.\S+/.test(data.email);
    if (!isValidEmail) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, data);
      const { token, ...user } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      switch (user.role) {
        case "COMMUNITY":
          router.push("/home");
          break;
        case "USER":
          router.push("/home");
          break;
        case "ADMIN":
          router.push("/admin");
          break;
        default:
          router.push("/auth/signin");
      }
    } catch {
      setError("Failed to login, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800 dark:text-white">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full rounded-lg border p-3 text-gray-800 dark:text-white dark:bg-gray-700 focus:ring focus:ring-primary"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full rounded-lg border p-3 text-gray-800 dark:text-white dark:bg-gray-700 focus:ring focus:ring-primary"
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Dont have an account?{' '}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Signin;
