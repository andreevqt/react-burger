// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

const throttle = (cb: (...args: any) => void, time: number) => {
  let last = 0;
  return (...args : any) => {
    const now = Date.now();
    if (now - last >= time) {
      cb(...args);
      last = now;
    }
  };
};

export default throttle;
