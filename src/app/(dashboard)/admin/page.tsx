"use client";
import { useEffect, useState } from "react";
import "@/styles/globals.css";

export default function Dashboard() {
  const [posts, setPosts] = useState<{ id: number; title: string; description: string; fullAddress: string }[]>([]);
  const [reports, setReports] = useState<{ id: number; title: string; description: string; fullAddress: string }[]>([]);
  const [tpa, setTpa] = useState<{ id: number; tpa_name: string; tpa_location: string; tpa_image: string; tpa_description: string }[]>([]);
  const [leaderboard, setLeaderboard] = useState<{ id: number; name: string; points: number }[]>([]);
  const [newTpa, setNewTpa] = useState({ tpa_name: "", tpa_location: "", tpa_image: "", tpa_description: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const url = "http://178.128.221.26:3000";

    const fetchData = async () => {
      const endpoints = ["/posts", "/posts/report", "/tpa", "/volunteer/leaderboard"];
      const setters = [setPosts, setReports, setTpa, setLeaderboard];
      
      for (let i = 0; i < endpoints.length; i++) {
        try {
          const res = await fetch(`${url}${endpoints[i]}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setters[i](data.data || data.leaderboard);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleTpaSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = "http://178.128.221.26:3000/tpa/upload";

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      setTpa([...tpa, data]);
      setNewTpa({ tpa_name: "", tpa_location: "", tpa_image: "", tpa_description: "" });
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
            <input type="text" placeholder="TPA Name" value={newTpa.tpa_name} onChange={(e) => setNewTpa({ ...newTpa, tpa_name: e.target.value })} className="w-full p-2 border rounded" required />
            <input type="text" placeholder="Location" value={newTpa.tpa_location} onChange={(e) => setNewTpa({ ...newTpa, tpa_location: e.target.value })} className="w-full p-2 border rounded" required />
            <textarea placeholder="Description" value={newTpa.tpa_description} onChange={(e) => setNewTpa({ ...newTpa, tpa_description: e.target.value })} className="w-full p-2 border rounded" required />
            <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" required />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add TPA</button>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">TPA List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border">TPA Name</th>
                  <th className="p-3 border">Location</th>
                  <th className="p-3 border">Description</th>
                  <th className="p-3 border">Image</th>
                </tr>
              </thead>
              <tbody>
                {tpa.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3 border">{item.tpa_name}</td>
                    <td className="p-3 border">{item.tpa_location}</td>
                    <td className="p-3 border">{item.tpa_description}</td>
                    <td className="p-3 border">
                      {item.tpa_image ? <img src={item.tpa_image} alt={item.tpa_name} className="w-20 h-20 object-cover rounded" /> : "No Image"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
