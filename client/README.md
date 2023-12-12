Ref variable:

Use a ref variable to store a flag indicating whether the effect has already run. This way, you can skip the effect execution if it has already run once.

const isEffectRun = useRef(false);

useEffect(() => {
  if (!isEffectRun.current) {
    // Your effect logic
    isEffectRun.current = true;
  }
}, []);


solution to solve the stirct mode behavior 