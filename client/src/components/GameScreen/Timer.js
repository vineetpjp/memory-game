import React, { useEffect, useRef, useState } from "react";

const Timer = ({ isCompleted }) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((pTime) => pTime + 500);
    }, 500);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isCompleted) {
      clearInterval(intervalRef.current);
    }
  }, [isCompleted]);

  const zeroPad = (number, size = 2) => {
    let s = String(number);
    while (s.length < size) {
      s = "0" + s;
    }
    return s;
  };

  const timeFormat = (miliseconds) => {
    let seconds = miliseconds / 1000;

    const hh = parseInt(String(seconds / 3600), 10);

    seconds %= 3600;

    const mm = parseInt(String(seconds / 60), 10);
    const ss = parseInt(String(seconds % 60), 10);

    return `${zeroPad(hh)}:${zeroPad(mm)}:${zeroPad(ss)}`;
  };

  return <div className={"header-item"}>{timeFormat(time)}</div>;
};

export default Timer;
