'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function CountUp({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
  style = {},
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);

      // Ease-out cubic formula for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progressRatio, 3);
      const currentVal = Math.floor(easeOut * end);

      setCount(currentVal);

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end, duration]);

  // Format with thousand separators
  const formattedCount = count.toLocaleString('en-US');

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}
