import React from "react";

const debounce = <TParameter,>(
  fn: (...args: TParameter[]) => void,
  delay: number
) => {
  let timeout: NodeJS.Timeout;
  return (...args: TParameter[]) => {
    console.log("debouncing", timeout);
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
};

const test = () => {
  const alertT = (a: string) => {
    alert(a);
  };
  const alertTyped = debounce(alertT, 1000);

  return (
    <input
      className="border border-blue-300"
      onChange={(e) => alertTyped(e.target.value)}
    />
  );
};

export default test;
