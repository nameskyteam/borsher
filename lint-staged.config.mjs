export default {
  '*.(ts|mjs)': () => ['pnpm check', 'pnpm lint', 'pnpm prettier'],
};
