declare global {
  interface Array<T> {
    after(element: T): T;
    before(element: T): T;
  }
}

export {};
