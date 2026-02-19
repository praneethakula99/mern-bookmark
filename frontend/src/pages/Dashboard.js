import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const Dashboard = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    category: "",
  });

  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Get Supabase session on mount
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login");
      } else {
        setToken(session.access_token);
        fetchBookmarks(session.access_token);
      }
    };

    getSession();
  }, [navigate]);

  // Fetch bookmarks
  const fetchBookmarks = async (authToken) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookmarks",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setBookmarks(res.data);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add bookmark
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/bookmarks/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBookmarks(token);
      setFormData({ title: "", url: "", category: "" });
    } catch (err) {
      console.error("Error adding bookmark:", err);
    }
  };

  // Delete bookmark
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/bookmarks/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBookmarks(token);
    } catch (err) {
      console.error("Error deleting bookmark:", err);
    }
  };

  // Toggle favourite
  const toggleFavourite = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookmarks/favourite/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBookmarks(token);
    } catch (err) {
      console.error("Error updating favourite:", err);
    }
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Bookmarks</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Add Bookmark Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            name="title"
            placeholder="Bookmark Title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="url"
            name="url"
            placeholder="Bookmark URL"
            className="form-control"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Bookmark
        </button>
      </form>

      {/* Display Bookmarks */}
      {bookmarks.length === 0 ? (
        <p>No bookmarks added yet.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Category</th>
              <th>Favourite</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark) => (
              <tr key={bookmark._id}>
                <td>{bookmark.title}</td>
                <td>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {bookmark.url}
                  </a>
                </td>
                <td>{bookmark.category}</td>
                <td>
                  <button
                    className={`btn btn-${
                      bookmark.favourite
                        ? "success"
                        : "outline-secondary"
                    } btn-sm`}
                    onClick={() =>
                      toggleFavourite(bookmark._id)
                    }
                  >
                    {bookmark.favourite ? "⭐" : "☆"}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(bookmark._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
