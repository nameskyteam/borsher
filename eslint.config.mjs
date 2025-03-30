import eslint from '@eslint/js';
import tslint from 'typescript-eslint';

export default tslint.config([
  eslint.configs.recommended,
  tslint.configs.recommended,
]);
