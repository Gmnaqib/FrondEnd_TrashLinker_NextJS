"use client";
import React from "react";
import { useState } from "react";

interface AddPostinganFormProps {
  onSubmit: (formData: any) => void;
}

const AddPostinganForm: React.FC<AddPostinganFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    imageProfile: "",
    name: "",
    date: "",
    title: "",
    description: "",
    imageBefore: "",
    imageAfter: "",
    city: "",
    tpa: "",
    dateVolunteer: "",
    volunteer: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({
      imageProfile: "",
      name: "",
      date: "",
      title: "",
      description: "",
      imageBefore: "",
      imageAfter: "",
      city: "",
      tpa: "",
      dateVolunteer: "",
      volunteer: 0,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Postingan</h2>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter title"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter description"
            rows={4}
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter city"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">TPA</label>
          <input
            type="text"
            name="tpa"
            value={formData.tpa}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter TPA"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Volunteer Date</label>
          <input
            type="date"
            name="dateVolunteer"
            value={formData.dateVolunteer}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Total Volunteers</label>
          <input
            type="number"
            name="volunteer"
            value={formData.volunteer}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter total volunteers"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Image Profile</label>
          <input
            type="text"
            name="imageProfile"
            value={formData.imageProfile}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter profile image URL"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Image Before</label>
          <input
            type="text"
            name="imageBefore"
            value={formData.imageBefore}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter before image URL"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Image After</label>
          <input
            type="text"
            name="imageAfter"
            value={formData.imageAfter}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter after image URL"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg hover:bg-blue-600"
      >
        Add Postingan
      </button>
    </form>
  );
};

export default AddPostinganForm;

