import { useState } from "react";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ExportButtonsProps {
  tpa: Array<{ id: number; tpa_name: string; tpa_location: string; tpa_description: string }>;
  posts: Array<{ title: string; description: string }>;
  reports: Array<{ title: string; description: string }>;
  leaderboard: Array<{ username: string; totalActivities: number }>;
}

export default function ExportButtons({ tpa, posts, reports, leaderboard }: ExportButtonsProps) {
  const exportToExcel = () => {
    const wb = utils.book_new();
    
    const tpaSheet = utils.json_to_sheet(tpa);
    utils.book_append_sheet(wb, tpaSheet, "TPA");

    const postsSheet = utils.json_to_sheet(posts);
    utils.book_append_sheet(wb, postsSheet, "Posts");

    const reportsSheet = utils.json_to_sheet(reports);
    utils.book_append_sheet(wb, reportsSheet, "Reports");

    const leaderboardSheet = utils.json_to_sheet(leaderboard);
    utils.book_append_sheet(wb, leaderboardSheet, "Leaderboard");

    writeFile(wb, "DashboardData.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.text("Dashboard Data", 14, 10);

    autoTable(doc, {
      head: [["Name", "Location", "Description"]],
      body: tpa.map(({ tpa_name, tpa_location, tpa_description }) => [tpa_name, tpa_location, tpa_description]),
      startY: 20,
      theme: "grid",
    });

    autoTable(doc, {
      head: [["Title", "Description"]],
      body: posts.map(({ title, description }) => [title, description]),
      startY: (doc as any).autoTable.previous.finalY + 10,
      theme: "grid",
    });

    autoTable(doc, {
      head: [["Title", "Description"]],
      body: reports.map(({ title, description }) => [title, description]),
      startY: (doc as any).lastAutoTable.finalY + 10,
      theme: "grid",
    });

    autoTable(doc, {
      head: [["Username", "Total Activities"]],
      body: leaderboard.map(({ username, totalActivities }) => [username, totalActivities]),
      startY: (doc as any).lastAutoTable.finalY + 10,
      theme: "grid",
    });

    doc.save("DashboardData.pdf");
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button onClick={exportToExcel} className="bg-green-500 text-white p-2 rounded">Export to Excel</button>
      <button onClick={exportToPDF} className="bg-blue-500 text-white p-2 rounded">Export to PDF</button>
    </div>
  );
}
