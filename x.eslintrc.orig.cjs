module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
	],
	ignorePatterns: ["dist"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh"],
	rules: {
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		"indent": "off",
		"@typescript-eslint/indent": ["error", "tab"],
		"quotes": "off",
		"@typescript-eslint/quotes": ["error", "double"],
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
		"comma-dangle": ["error", {
			arrays: "always-multiline",
			objects: "always-multiline",
			imports: "never",
			exports: "never",
			functions: "never",
		}],
		"semi": "off",
		"@typescript-eslint/semi": ["error", "always", {
			omitLastInOneLineBlock: true,
			omitLastInOneLineClassBody: true,
		}],
	},
};
