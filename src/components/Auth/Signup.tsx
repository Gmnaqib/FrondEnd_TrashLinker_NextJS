"use client";
import { motion } from "framer-motion";
import axios from "axios"; // import axios
import { useState } from "react";
import Link from "next/link";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    address: "",
    longitude: "",
    latitude: "",
    role: "", // "Masyarakat" or "Komunitas"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Mengirimkan data ke server
      const response = await axios.post("http://localhost/user/register", data);
      console.log("Response:", response.data);

      
      // Menangani response dari server, misalnya redirect atau pesan sukses
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mendaftar.");
    }
  };

  return (
    <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
      <div className="relative z-1 mx-auto max-w-4xl px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
        <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
        >
          <h2 className="mb-10 text-center text-3xl font-semibold text-black dark:text-white xl:text-4xl">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={data.username}
                onChange={handleChange}
                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
              />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={data.email}
                onChange={handleChange}
                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
              />
            </div>

            <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
              <select
                name="role"
                value={data.role}
                onChange={handleChange}
                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
              >
                <option value="">Select Role</option>
                <option value="masyarakat">Masyarakat</option>
                <option value="komunitas">Komunitas</option>
              </select>

              <input
                name="address"
                type="text"
                placeholder="Full Address"
                value={data.address}
                onChange={handleChange}
                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
              />
            </div>

            <div className="mb-7.5">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
              />
            </div>

            <div className="mb-7.5 flex justify-center">
              <button
                type="submit"
                className="w-full rounded-sm border border-stroke bg-primary px-6 py-3 text-base text-white outline-none transition-all duration-300 hover:bg-primary-dark"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center text-base text-body-color dark:text-body-color-dark">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Signup;
