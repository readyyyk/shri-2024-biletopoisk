/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 80,
  tabWidth: 4,
  trailingComma: "all",
  singleQuote: true,
  semi: true,
  importOrder: [
    "^react$",
    "<THIRD_PARTY_MODULES>",
    "^@/types/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/(.*)$",
    "^[./]"
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports"
  ]
}