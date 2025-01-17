"use client";
import React from "react";
import CountUp from "react-countup";

const AnimatedCountUp = ({
  countUpTo,
  countUpFrom,
  duration = 2,
}: {
  countUpTo: number;
  countUpFrom: number;
  duration: number;
}) => {
  return (
    <CountUp
      start={countUpFrom}
      separator=","
      end={countUpTo}
      duration={duration}
    />
  );
};

export default AnimatedCountUp;
