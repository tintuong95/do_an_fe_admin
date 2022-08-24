import React from 'react';
import { useSpring, config, animated } from "react-spring";


const AnimateNumber = (props) => {
    const { number } = useSpring({
      reset: true,
      reverse: false,
      to: { number: props.number },
      from: { number: 0 },

      delay: 200,
      config: config.molasses,
    });
    return (
      <>
        <animated.div>
          {number.to((n) => n.toLocaleString("vn-VN"))}
        </animated.div>

      </>
    );
};




export default AnimateNumber;
