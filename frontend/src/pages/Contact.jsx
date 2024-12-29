import React, { useState } from 'react';
import { Terminal } from 'lucide-react'; // Keep if you still want to use the Lucide icon for Terminal
import Typewriter from 'typewriter-effect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://a-seif.zapto.org:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('Your response has been received!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Error submitting form.');
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
      alert('Network error.');
    }
  };

  // Contact information array using Font Awesome icons
  const contactInfo = [
    {
      icon: <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />,
      text: 'ahmed.am.seif@gmail.com',
    },
    {
      icon: <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />,
      text: '+201203021321',
    },
    {
      icon: <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />,
      text: 'github.com/AhmedAbdelazizSeif',
    },
    {
      icon: <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />,
      text: 'linkedin.com/in/AhmedAbdelazizSeif',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left: Terminal / Typewriter Section */}
        <div className="bg-black rounded-lg p-6">
          <div className="flex items-center mb-4 text-gray-400">
            <Terminal size={20} className="mr-2" />
            <span>Terminal</span>
          </div>
          <div className="font-mono text-green-400 space-y-2">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString('$ sudo get_contact_info')
                  .pauseFor(1000)
                  .typeString('<br />Permission Allowed')
                  .pauseFor(500)
                  .typeString('<br />Loading contact information...')
                  .pauseFor(1000)
                  .callFunction(() => {
                    // When the typing finishes, show contact info
                    setShowContactInfo(true);
                  })
                  .start();
              }}
              options={{
                delay: 50,
                cursor: '', //▋
              }}
            />

            {/* Contact Info Fade-In Section */}
            <div
              className={`space-y-2 mt-4 transition-opacity duration-1000 ${
                showContactInfo ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2"
                  style={{
                    animation: showContactInfo
                      ? `fadeIn 0.5s ease-in ${index * 0.2}s forwards`
                      : 'none',
                    opacity: 0,
                  }}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}

              <div
                className="text-center mt-6"
                style={{
                  animation: showContactInfo
                    ? 'fadeIn 0.5s ease-in 1s forwards'
                    : 'none',
                  opacity: 0,
                }}
              >
                <p className="text-red-500 mb-2">More Urgent?</p>
                <a
                  href="YOUR_BOOKING_LINK"
                  className="inline-block px-4 py-2 border border-green-400 text-green-400 rounded hover:bg-green-400/10 transition-colors"
                >
                  Book a Meeting
                </a>
              </div>
            </div>

            <p className="text-gray-500 mt-4 animate-pulse">▋</p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-white">Contact Me</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Name', type: 'text', name: 'name' },
              { label: 'Email', type: 'email', name: 'email' },
              { label: 'Subject', type: 'text', name: 'subject' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block mb-1 font-medium text-gray-300">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                  required
                />
              </div>
            ))}

            <div>
              <label className="block mb-1 font-medium text-gray-300">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-medium"
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
