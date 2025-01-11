module.exports = {
  "*.ts": () => [
    "pnpm check",
    "pnpm lint",
    "pnpm prettier",
  ],
};
