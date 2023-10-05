// QuickApplyForm.js
import React, { useState } from "react";

function QuickApplyForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields here if needed

    // Create an application object with form data
    const application = {
      name,
      email,
      coverLetter,
      resume,
    };

    // Pass the application data to the parent component for further handling
    onSubmit(application);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      {/* Add similar input fields for Email, Cover Letter Note, and Resume */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuickApplyForm;
