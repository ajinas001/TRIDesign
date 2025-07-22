import React from 'react';
import Navbar from '../components/Navbar';
import WorksHeader from '../components/works/WorksHeader';
import Masonry from '../components/works/WorkShowcase';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function WorksPage() {
  const items = [
    { id: '1', img: '/images/6.jpg', url: '#', height: 500 },
    { id: '2', img: '/images/7.jpg', url: '#', height: 450 },
    { id: '4', img: '/images/11.png', url: '#', height: 500 },
    { id: '5', img: '/images/13.png', url: '#', height: 300 },
    { id: '6', img: '/images/R6.png', url: '#', height: 600 },
    { id: '7', img: '/images/R7.png', url: '#', height: 400 },
    { id: '8', img: '/images/R8.png', url: '#', height: 350 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar />
      <div className="mt-20">
        <WorksHeader />
      </div>
      <div className="py-12">
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>
      <div className="py-12">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

export default WorksPage;
