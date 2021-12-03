// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

const throttle = (cb, time) => {
  let last = 0;
  return (...args) => {
    const now = new Date();
    if (now - last >= time) {
      cb(...args);
      last = now;
    }
  };
};

export default throttle;
