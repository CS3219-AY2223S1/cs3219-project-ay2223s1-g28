import { useEffect, useState } from 'react';

const DURATION = 30;

function Timer() {
  const [counter, setCounter] = useState(DURATION);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(prevCounter => prevCounter - 1), 1000);
  }, [counter]);

  return (
    <>{counter}</>
  );
}

export default Timer;
