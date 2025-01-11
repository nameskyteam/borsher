module.exports = {
  '*.(ts|js)': () => ['pnpm check', 'pnpm lint', 'pnpm prettier'],
};
