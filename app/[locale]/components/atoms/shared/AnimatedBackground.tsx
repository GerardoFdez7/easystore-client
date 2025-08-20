const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none relative inset-0 h-full w-full overflow-hidden">
      <div className="bg-secondary/20 dark:bg-secondary/10 absolute -top-30 -right-40 h-80 w-80 animate-pulse rounded-full blur-3xl"></div>
      <div className="bg-primary/20 dark:bg-primary/10 absolute -bottom-30 -left-40 h-80 w-80 animate-pulse rounded-full blur-3xl delay-1000"></div>
    </div>
  );
};

export default AnimatedBackground;
