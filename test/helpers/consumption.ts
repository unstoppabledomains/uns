export function percDiff (a: bigint, b: bigint) {
  return Number((-((a - b) / a) * BigInt(100))).toFixed(2);
}
