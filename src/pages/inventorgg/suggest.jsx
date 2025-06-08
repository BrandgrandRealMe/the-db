import React, { useState } from 'react';
import Layout from '@theme/Layout';
import '@site/src/css/suggestForm.css';

export default function Suggest() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    // 🎯 IMPORTANT: Replace with YOUR ACTUAL Strapi Cloud API URL
    const strapiCloudApiUrl = 'https://precious-darling-7ec9e4b39b.strapiapp.com/api/inventor-suggestions'; 
    // Example: 'https://api.my-website-forms.cloud.strapi.io/api/suggestions'

    const formData = {
      data: { 
        type: e.target.type.value,
        title: e.target.title.value,
        description: e.target.description.value,
        usecase: e.target.usecase.value,
        contact: e.target.contact.value,
      },
    };

    try {
      const res = await fetch(strapiCloudApiUrl, { // Use the cloud URL here
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('✅ Suggestion submitted successfully!');
        e.target.reset(); 
      } else {
        const errorData = await res.json();
        console.error('Strapi Cloud submission error:', errorData);
        setStatus(`❌ Submission failed: ${errorData.error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network error during submission:', error);
      setStatus('❌ Submission failed. Please check your network connection or Strapi Cloud status.');
    }
  };

  return (
    <Layout title="Suggest a Block or Tutorial">
      <main className="container padding-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Suggest a Block or Tutorial</h1>
            <p className="margin-bottom--lg">
              Have an idea for a new block or tutorial? Let us know here!
            </p>

            <form onSubmit={handleSubmit} className="suggest-form">
              <div className="form-group">
                <label htmlFor="type">Suggestion Type</label>
                <select id="type" name="type" required>
                  <option value="Block">Block</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  placeholder="e.g. Discord Webhook Block"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  required
                  placeholder="What does this block/tutorial do?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="usecase">Use Case (Optional)</label>
                <textarea
                  name="usecase"
                  id="usecase"
                  placeholder="Explain how you would use this suggestion"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact">Your Name or Discord (Optional)</label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  placeholder="e.g. brandongrand#0001"
                />
              </div>

              <button type="submit" className="button button--primary">
                Submit Suggestion
              </button>

              {status && <p className="submission-status">{status}</p>}
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}