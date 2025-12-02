export const isEquals = (expected: number, actual: number) => {
  if (expected !== actual)
    throw new Error(`Expected ${expected} but got ${actual}`);
};

export const isTruthy = (expected: boolean) => {
  if (!expected) {
    throw new Error(`Expected value to be truthy`);
  }
};

export const isFalsy = (expected: boolean) => {
  if (expected) {
    throw new Error(`Expected value to be truthy`);
  }
};
