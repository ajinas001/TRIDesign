'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const OurStory = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const text = "At Vexa Architect, we blend creativity and technology to deliver cutting-edge plan designs and immersive 3D visuals that bring ideas to life.";
  const highlightText = "We're shaping tomorrow's spaces—together.";
  const words = text.split(' ');
  const highlightWords = highlightText.split(' ');

  const containerOpacity = useTransform(smoothProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);
  const containerY = useTransform(smoothProgress, [0, 0.2, 0.85, 1], [100, 0, 0, -100]);
  const containerScale = useTransform(smoothProgress, [0, 0.2, 0.85, 1], [0.8, 1, 1, 0.8]);

  const textColorProgress = useTransform(smoothProgress, [0.1, 0.6, 0.85], [0, 1, 1]);
  const mainTextColor = useTransform(textColorProgress, (val) =>
    `rgb(${28 + val * (202 - 28)}, ${28 + val * (169 - 28)}, ${28 + val * (185 - 28)})`
  );

  const decorativeOpacity = useTransform(smoothProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const decorativeScale = useTransform(smoothProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const decorativeRotation = useTransform(smoothProgress, [0, 1], [0, 360]);

  const highlightOpacity = useTransform(smoothProgress, [0.1, 0.4, 0.75, 0.95], [0, 1, 1, 0]);
  const highlightScale = useTransform(smoothProgress, [0.1, 0.4, 0.75, 0.95], [0.9, 1, 1, 0.9]);
  const highlightBlur = useTransform(smoothProgress, [0.1, 0.4, 0.75, 0.95], [4, 0, 0, 4]);

  const underlineWidth = useTransform(smoothProgress, [0.2, 0.5, 0.75, 0.9], [0, 200, 200, 0]);
  const underlineOpacity = useTransform(smoothProgress, [0.2, 0.5, 0.75, 0.9], [0, 1, 1, 0]);

  const getWordTransforms = (index, totalWords) => {
    const start = 0.1 + (index / totalWords) * 0.3;
    const end = 0.4 + (index / totalWords) * 0.3;
    const exit = 0.75 + (index / totalWords) * 0.15;

    return {
      opacity: useTransform(smoothProgress, [start, start + 0.1, end, exit], [0, 1, 1, 0]),
      y: useTransform(smoothProgress, [start, start + 0.1, end, exit], [50, 0, 0, -30]),
      rotateX: useTransform(smoothProgress, [start, start + 0.1, end, exit], [90, 0, 0, -45]),
      filter: useTransform(smoothProgress, [start, start + 0.1, end, exit], ["blur(4px)", "blur(0px)", "blur(0px)", "blur(2px)"]),
      color: mainTextColor
    };
  };

  const getHighlightWordTransforms = (index, totalWords) => {
    const start = 0.3 + (index / totalWords) * 0.2;
    const end = 0.5 + (index / totalWords) * 0.2;
    const exit = 0.8 + (index / totalWords) * 0.1;

    return {
      opacity: useTransform(smoothProgress, [start, start + 0.05, end, exit], [0, 1, 1, 0]),
      y: useTransform(smoothProgress, [start, start + 0.05, end, exit], [30, 0, 0, -20]),
      scale: useTransform(smoothProgress, [start, start + 0.05, end, exit], [0.8, 1, 1, 0.9])
    };
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden"
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute top-8 left-6 w-3 h-3 bg-gradient-to-r from-black to-gray-600 rounded-full shadow-lg"
        style={{
          opacity: decorativeOpacity,
          scale: decorativeScale,
          rotate: decorativeRotation
        }}
      />
      <motion.div
        className="absolute top-20 right-12 w-2 h-2 bg-[#caa9b9] rounded-full"
        style={{
          opacity: decorativeOpacity,
          scale: decorativeScale,
          rotate: useTransform(decorativeRotation, (val) => val * -0.5)
        }}
      />
      <motion.div
        className="absolute bottom-16 left-16 w-4 h-4 border-2 border-[#caa9b9] opacity-40"
        style={{
          opacity: decorativeOpacity,
          scale: decorativeScale,
          rotate: useTransform(decorativeRotation, (val) => val * 0.3 + 45)
        }}
      />

      <motion.div
        className="max-w-4xl text-center relative"
        style={{
          opacity: containerOpacity,
          y: containerY,
          scale: containerScale
        }}
      >
        <div className="text-[22px] md:text-[32px] lg:text-[44px] font-dominik leading-snug mb-6">
          {words.map((word, index) => {
            const transforms = getWordTransforms(index, words.length);
            return (
              <motion.span
                key={index}
                className="inline-block mr-2 transform-gpu"
                style={{
                  opacity: transforms.opacity,
                  y: transforms.y,
                  rotateX: transforms.rotateX,
                  filter: transforms.filter,
                  color: transforms.color,
                  transformOrigin: "bottom"
                }}
              >
                {word}
              </motion.span>
            );
          })}
        </div>

        <motion.div
          className="relative"
          style={{
            opacity: highlightOpacity,
            scale: highlightScale,
            filter: useTransform(highlightBlur, (val) => `blur(${val}px)`)
          }}
        >
          <div className="text-[24px] md:text-[34px] lg:text-[38px] font-medium text-[#caa9b9] leading-relaxed relative z-10">
            {highlightWords.map((word, index) => {
              const transforms = getHighlightWordTransforms(index, highlightWords.length);
              return (
                <motion.span
                  key={index}
                  className="inline-block mr-2"
                  style={{
                    opacity: transforms.opacity,
                    y: transforms.y,
                    scale: transforms.scale
                  }}
                >
                  {word}
                </motion.span>
              );
            })}
          </div>

          {/* Background accent with lighter blur */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#caa9b9]/10 to-[#caa9b9]/5 rounded-lg blur-md"
            style={{
              opacity: useTransform(highlightOpacity, (val) => val * 0.5),
              scale: highlightScale
            }}
          />
        </motion.div>

        <motion.div
          className="mt-8 mx-auto bg-gradient-to-r from-transparent via-[#caa9b9] to-transparent h-[1px]"
          style={{
            width: underlineWidth,
            opacity: underlineOpacity
          }}
        />

        {/* Subtle glow with reduced blur */}
        <motion.div
          className="absolute -inset-20 bg-gradient-to-r from-[#caa9b9]/5 via-transparent to-[#caa9b9]/5 rounded-full blur-xl"
          style={{
            opacity: useTransform(containerOpacity, (val) => val * 0.3),
            scale: containerScale
          }}
        />
      </motion.div>
    </section>
  );
};

export default OurStory;
