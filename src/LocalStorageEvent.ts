export const ListenEvent = (key: string, fn: (value: any) => void) => {
  window.addEventListener(key, (event: any) => {
    fn(event.detail);
  });
};

export const DispatchEvent = (key: string, value: any) => {
  window.dispatchEvent(new CustomEvent(key, { detail: value }));
};
