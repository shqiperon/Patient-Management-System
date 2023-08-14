import React, { useState, useEffect } from "react";

function CreateP() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published_at, setPublishedAt] = useState("");

    useEffect(() => {
    // Fetch categories or perform any other necessary operations
    }, []);

    const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("published_at", published_at);

    fetch("http://127.0.0.1:8000/api/news", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        // Redirect to the news index page
        window.location.href = "/doctorpages/news/Indexnu";
        })
        .catch((error) => console.error(error));
    };

    return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Create News</h1>
        <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => window.history.back()}
        >
            Back
        </button>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
            <label htmlFor="title">Title</label>
            <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
        </div>
        
        <div className="form-group mb-2">
            <label htmlFor="content">Content</label>
            <textarea
            name="content"
            id="content"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            />
        </div>

        <div className="form-group mb-2">
            <label htmlFor="published_at">Published At</label>
            <input
            type="text"
            name="published_at"
            id="published_at"
            className="form-control"
            value={published_at}
            onChange={(e) => setPublishedAt(e.target.value)}
            required
            />
        </div>        
        <button type="submit" className="btn btn-sm btn-outline-secondary">
            Submit
        </button>
        </form>
    </div>
    );
}

export default CreateP;
