import { useEffect, useState } from 'react';

function Timer() {
  const DURATION = 30;
  const [counter, setCounter] = useState(DURATION);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <>{counter}</>
  );
}

export default Timer;
