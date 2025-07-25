'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import CircularText from './animatedcomponents/Circulartext';

const projects = [
  {
    title: 'Urban Masterplan',
    image: '/images/11.png',
  },
  {
    title: 'City Skyline',
    image: '/images/T21.jpg',
  },
];

export default function FeaturedProjects() {
  return (
    <section className="bg-secondary text-black py-20 px-4 md:px-16">
      <div>
        {/* Section Heading */}
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-light border-t border-b border-gray-300 py-4"
        >
          Featured Projects
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 text-gray-700 max-w-2xl text-base md:text-lg"
        >
          Archipelago&apos;s portfolio of city making projects, from expansive urban
          renewal to intimate residential spaces, showcases our innovative and
          people-centric approach to city making.
        </motion.p>

        {/* Project Grid */}
        <div className="relative mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden group  shadow-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={1000}
                height={600}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Project Title */}
              <div className="absolute bottom-4 left-4 text-black px-3 py-1 text-sm font-medium rounded">
                {project.title}
              </div>

               <a
               href='/works'
                className=' hidden md:block absolute bottom-4 right-4  px-3 py-1 text-sm font-light rounded'>
                  {i === projects.length - 1 && (
                    <CircularText
                      text="*VIEW*OTHER*PROJECTS"
                      onHover="speedUp"
                      spinDuration={20}
                      className="absolute bottom-0 right-0 z-10"
                    />
                  )}
                </a>

              {/* CircularText only on last project image */}
              {/* {i === projects.length - 1 && (
                <CircularText
                  text="VIEW*OTHER*PROJECTS"
                  onHover="speedUp"
                  spinDuration={20}
                  className="absolute bottom-0 right-0 z-10"
                />
              )} */}
            </motion.div>
          ))}
        </div>

        {/* View All Button at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center text-base font-medium group pb-1"
          >
            {/* View All Projects text or icon can go here */}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
