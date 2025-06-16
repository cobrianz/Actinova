"use client";

import { useEffect, useRef } from "react";

const CursorFollower = () => {
  const followerRef = useRef(null);
  const bubbleRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const follower = followerRef.current;
    const bubbles = bubbleRefs.map((ref) => ref.current);
    let mouseX = 0,
      mouseY = 0,
      followerX = 0,
      followerY = 0;
    const bubblePositions = bubbles.map(() => ({ x: 0, y: 0 }));

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const update = () => {
      if (follower) {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
      }

      bubbles.forEach((bubble, index) => {
        if (bubble) {
          const delayFactor = 0.1 * (index + 1); // Reduced delay for tighter following
          bubblePositions[index].x +=
            (mouseX - bubblePositions[index].x) * delayFactor;
          bubblePositions[index].y +=
            (mouseY - bubblePositions[index].y) * delayFactor;
          bubble.style.left = `${bubblePositions[index].x}px`;
          bubble.style.top = `${bubblePositions[index].y}px`;
        }
      });

      requestAnimationFrame(update);
    };

    document.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(update);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={followerRef}
        className="fixed w-5 h-5 border-2 border-[#7B68EE] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50"
      />
      {bubbleRefs.map((ref, index) => (
        <div
          key={index}
          ref={ref}
          className="fixed w-3 h-3 bg-[#7B68EE] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        />
      ))}
    </>
  );
};

export default CursorFollower;
