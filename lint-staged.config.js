module.exports = {
  '**/*.{js,jsx,ts,tsx,json,css,md}': [
    'eslint --ignore-pattern "**/generated.ts"',
    'prettier --write',
  ],
};
