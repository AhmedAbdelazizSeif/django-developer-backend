import React, { useState } from 'react';
import { Terminal } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if(res.ok) {
        alert('Your response has been received!');
        setFormData({ name:'', email:'', subject:'', message:'' });
      } else {
        alert('Error submitting form.');
      }
    } catch (error) {
      console.error(error);
      alert('Network error.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-black rounded-lg p-6 font-mono text-green-400 flex flex-col">
          <div className="flex items-center mb-4 text-gray-400">
            <Terminal size={20} className="mr-2" />
            <span>Terminal</span>
          </div>
          <div className="space-y-2">
            <p>$ sudo get_contact_info</p>
            <p>Permission Allowed</p>
            <p className="text-gray-500">Loading contact information...</p>
            <div className="space-y-1 mt-4">
              <p>Email = ahmed.am.seif@gmail.com</p>
              <p>Phone = +201203021321</p>
              <p>GitHub = github.com/AhmedAbdelazizSeif</p>
              <p>LinkedIn = linkedin.com/in/AhmedAbdelazizSeif</p>
            </div>
            <p className="text-gray-500 mt-4 animate-pulse">_</p>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-white">Contact Me</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium text-gray-300">Name</label>
              <input 
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-300">Email</label>
              <input
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-1 font-medium text-gray-300">Subject</label>
              <input 
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-medium text-gray-300">Message</label>
              <textarea 
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                name="message" 
                rows="5" 
                value={formData.message} 
                onChange={handleChange} 
                required
              />
            </div>
            <button 
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-medium"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;