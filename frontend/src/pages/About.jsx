import React, { useEffect, useState } from 'react';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/about')
      .then((response) => response.json())
      .then((data) => setAboutData(data))
      .catch((error) => console.error('Error fetching about data:', error));
  }, []);

  if (!aboutData) {
    return <div className="text-gray-200">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-5">
      <h3 className="text-yellow-300 text-xl font-bold mb-4">A Little Bit About Me</h3>
      <div className="max-w-3xl w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-sm md:text-base font-mono text-gray-200 whitespace-pre-wrap break-words">
          <span className="text-green-400">"""</span>
          <span className="text-green-400">{aboutData.title}</span>
          <span className="text-green-400">"""</span>
          <br/>

          <span className="text-blue-400">class</span> <span className="text-yellow-400">Ahmed</span>:<br/>
          
          &nbsp;&nbsp;<span className="text-blue-400">def</span> <span className="text-teal-300">__init__</span>(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-400">self.story</span> = <span className="text-yellow-300">"""<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;{aboutData.story}
          &nbsp;&nbsp;&nbsp;&nbsp;<br/>"""</span><br/>

          &nbsp;&nbsp;<span className="text-blue-400">def</span> <span className="text-blue-400">connect</span>(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">return</span> <span className="text-yellow-300">"{aboutData.connect}"</span>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}

export default AboutPage;