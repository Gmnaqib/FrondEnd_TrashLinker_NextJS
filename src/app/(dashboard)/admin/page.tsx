"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/globals.css";
import ExportButtons from "./ExportButton";

export default function Dashboard() {
  const router = useRouter();
  const [tpa, setTpa] = useState<
    {
      id: number;
      tpa_name: string;
      tpa_location: string;
      tpa_description: string;
    }[]
  >([]);
  const [posts, setPosts] = useState<
    { id: number; title: string; description: string; fullAddress: string }[]
  >([]);
  const [reports, setReports] = useState<
    { id: number; title: string; description: string; fullAddress: string }[]
  >([]);
  const [leaderboard, setLeaderboard] = useState<
    { userId: number; username: string; totalActivities: number }[]
  >([]);
  const [newTpa, setNewTpa] = useState({
    tpa_name: "",
    tpa_location: "",
    tpa_image: "",
    tpa_description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const userRole: "USER" | "ADMIN" = user?.role || "USER";

    if (userRole !== "ADMIN") {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const url = "http://178.128.221.26:3000";

    const fetchData = async () => {
      try {
        const [postsRes, reportsRes, tpaRes, leaderboardRes] =
          await Promise.all([
            fetch(`${url}/posts`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`${url}/posts/report`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`${url}/tpa`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`${url}/volunteer/leaderboard`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        const postsData = await postsRes.json();
        const reportsData = await reportsRes.json();
        const tpaData = await tpaRes.json();
        const leaderboardData = await leaderboardRes.json();

        setPosts(postsData.data || []);
        setReports(reportsData.data || []);
        setTpa(tpaData.data || []);
        setLeaderboard(leaderboardData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTpa({ ...newTpa, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/signin");
  };

  const handleTpaSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = "http://178.128.221.26:3000/tpa";

    const formData = new FormData();
    formData.append("tpa_name", newTpa.tpa_name);
    formData.append("tpa_location", newTpa.tpa_location);
    formData.append("tpa_description", newTpa.tpa_description);
    if (selectedFile) {
      formData.append("tpa_image", selectedFile);
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setTpa([...tpa, data]);
      setNewTpa({
        tpa_name: "",
        tpa_location: "",
        tpa_image: "",
        tpa_description: "",
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error adding TPA:", error);
    }
  };

  return (
    <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add TPA</h2>
          <form onSubmit={handleTpaSubmit} className="mb-4 space-y-4">
            <input
              type="text"
              placeholder="TPA Name"
              value={newTpa.tpa_name}
              onChange={(e) =>
                setNewTpa({ ...newTpa, tpa_name: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={newTpa.tpa_location}
              onChange={(e) =>
                setNewTpa({ ...newTpa, tpa_location: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={newTpa.tpa_description}
              onChange={(e) =>
                setNewTpa({ ...newTpa, tpa_description: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Add TPA
            </button>
          </form>
        </div>

        {/* TPA List as Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">TPA List</h2>
          <div className="overflow-auto max-h-96">
            {" "}
            {/* Tambahkan scroll dengan batas tinggi */}
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Location</th>
                  <th className="border p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {tpa.map((item) => (
                  <tr key={item.id} className="border">
                    <td className="border p-2">{item.tpa_name}</td>
                    <td className="border p-2">{item.tpa_location}</td>
                    <td className="border p-2">{item.tpa_description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Postingan List as Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Postingan List
          </h2>
          <div className="overflow-auto max-h-96">
            {" "}
            {/* Tambahkan scroll dengan batas tinggi */}
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border">
                    <td className="border p-2">{post.title}</td>
                    <td className="border p-2">{post.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Postingan List as Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Reports List
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((post) => (
                <tr key={post.id} className="border">
                  <td className="border p-2">{post.title}</td>
                  <td className="border p-2">{post.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Leaderboard List as Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Leaderboard List
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Username</th>
                <th className="border p-2">Total Activities</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry.userId} className="border">
                  <td className="border p-2">{entry.username}</td>
                  <td className="border p-2">{entry.totalActivities}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ExportButtons
          tpa={tpa}
          posts={posts}
          reports={reports}
          leaderboard={leaderboard}
        />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 text-white p-3 rounded-lg"
        >
          Logout
        </button>
      </div>
    </section>
  );
}
