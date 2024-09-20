module.exports = {
  "*.ts": () => [
    "pnpm lint",
    "pnpm prettier",
    "pnpm check",
  ],
};
