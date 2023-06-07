export const clickOutSide = (node: HTMLElement, callback: () => void) => {
  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (node && !node.contains(target) && !event.defaultPrevented) {
      callback();
    }
  };

  document.addEventListener("click", handleClick);

  return {
    update(newCallback: () => void) {
      callback = newCallback;
    },
    destroy() {
      document.removeEventListener("click", handleClick);
    },
  };
};
