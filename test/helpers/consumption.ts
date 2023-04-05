export function percDiff (a: number, b: number) {
  return (-((a - b) / a) * 100).toFixed(2);
}
