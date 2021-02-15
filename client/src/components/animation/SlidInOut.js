const mountVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ease: 'easeIn',
    },
  },
};

const staggerVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const slidInVariants = {
  hidden: {
    opacity: 0,
    x: '100vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      type: 'tween',
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: '100vw',
    transition: {
      duration: 0.35,
      type: 'tween',
      ease: 'easeIn',
    },
  },
};

const hamburgerVariants = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
    },
  },
  exit: {
    y: '-100vh',
    opacity: 1,
    transition: {
      type: 'tween',
    },
  },
};

export { mountVariants, slidInVariants, staggerVariants, hamburgerVariants };
