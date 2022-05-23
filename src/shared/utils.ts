export function createSearchFromDto<T>(dto: T, exclude: string[]) {
  return Object.fromEntries(
    Object.entries(dto).filter(
      ([key, value]) => !!value && !exclude.includes(key),
    ),
  );
}

export function createMockList<T>(
  quantity: number,
  factory: (index: number) => T,
): T[] {
  return Array(quantity)
    .fill(null)
    .map((...params) => (([, index]) => factory(index))(params));
}
