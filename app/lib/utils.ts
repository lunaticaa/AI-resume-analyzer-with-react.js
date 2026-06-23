/**
 * Convert bytes to a human-readable string using KB/MB/GB units.
 * Uses 1024 as the base.
 */
export default function formatSize(bytes: number): string {
  if (typeof bytes !== 'number' || isNaN(bytes) || bytes < 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes < 1024) return `${bytes} B`;
  let i = Math.floor(Math.log(bytes) / Math.log(1024));
  i = Math.min(i, units.length - 1);
  const value = bytes / Math.pow(1024, i);
  const decimals = value < 10 ? 1 : 0;
  return `${value.toFixed(decimals)} ${units[i]}`;
}

export { formatSize as formatSizeReadable };

export const generateUUID = () => crypto.randomUUID()
