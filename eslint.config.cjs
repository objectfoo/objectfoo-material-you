// @ts-check
const eslint = require("@eslint/js");
const eslintNode = require("eslint-plugin-n");
const globals = require("globals");
const path = require("path");
const stylistic = require("@stylistic/eslint-plugin");
const tseslint = require("typescript-eslint");


/**
 * @typedef {(import("eslint").Linter.Config & { name?: string; })} FlatConfigWithName
 */


const FileGlobs = {
	"browser": ["**/*.{ts,tsx}"],
	"cjs": ["**/*.{cjs,js}"],
	"esm": ["**/*.mjs"],
};


const ERROR = "error";
const WARN = "warn";
const OFF = "off";


/**
 * Rules common to all code types
 * @type {FlatConfigWithName[]}
 */
const CommonCodeConfigs = [
	{
		name: "eslint:recommended all",
		...eslint.configs.recommended,
		rules: { ...eslint.configs.recommended.rules },
	},
	{
		name: "whs-custom:all-code",
		rules: {
			// NOTE: sorted list below (⌐■_■)
			"arrow-body-style": OFF,
			"camelcase": ERROR,
			"curly": ERROR,
			"default-case": ERROR,
			"default-param-last": ERROR,
			"dot-notation": ERROR,
			"eqeqeq": [ERROR, "smart"],
			"guard-for-in": ERROR,
			"no-alert": ERROR,
			"no-bitwise": ERROR,
			"no-caller": ERROR,
			"no-console": WARN,
			"no-constructor-return": ERROR,
			"no-duplicate-imports": ERROR,
			"no-empty-function": ERROR,
			"no-eval": ERROR,
			"no-labels": ERROR,
			"no-lone-blocks": ERROR,
			"no-multi-assign": ERROR,
			"no-new-wrappers": ERROR,
			"no-new": ERROR,
			"no-param-reassign": ERROR,
			"no-return-assign": ERROR,
			"no-self-compare": ERROR,
			"no-sequences": ERROR,
			"no-template-curly-in-string": ERROR,
			"no-throw-literal": ERROR,
			"no-unmodified-loop-condition": ERROR,
			"no-unneeded-ternary": ERROR,
			"no-useless-computed-key": ERROR,
			"no-useless-concat": ERROR,
			"no-useless-rename": ERROR,
			"no-var": ERROR,
			"no-void": ERROR,
			"radix": ERROR,
			"yoda": ERROR,
		},
	},
	{
		name: "stylistic - everywhere",
		plugins: {
			"@stylistic": stylistic,
		},
		rules: {
			"@stylistic/array-bracket-newline": [ERROR, "consistent"],
			"@stylistic/array-bracket-spacing": [ERROR, "never"],
			"@stylistic/arrow-parens": [ERROR, "always"],
			"@stylistic/arrow-spacing": ERROR,
			"@stylistic/block-spacing": [ERROR, "always"],
			"@stylistic/brace-style": [ERROR, "1tbs", { "allowSingleLine": true }],
			"@stylistic/comma-dangle": [ERROR, { "objects": "always-multiline", "arrays": "always-multiline", "functions": "never" }],
			"@stylistic/comma-spacing": ERROR,
			"@stylistic/comma-style": ERROR,
			"@stylistic/dot-location": [ERROR, "property"],
			"@stylistic/eol-last": [ERROR, "always"],
			"@stylistic/func-call-spacing": ERROR,
			"@stylistic/implicit-arrow-linebreak": ERROR,
			"@stylistic/indent": [ERROR, "tab", { "SwitchCase": 1 }],
			"@stylistic/key-spacing": ERROR,
			"@stylistic/keyword-spacing": ERROR,
			"@stylistic/linebreak-style": [ERROR, "windows"],
			"@stylistic/lines-between-class-members": [ERROR, "always", { "exceptAfterSingleLine": true }],
			"@stylistic/new-parens": ERROR,
			"@stylistic/no-mixed-operators": ERROR,
			"@stylistic/no-multi-spaces": ERROR,
			"@stylistic/no-multiple-empty-lines": [ERROR, { "max": 2, "maxEOF": 1, "maxBOF": 0 }],
			"@stylistic/no-trailing-spaces": ERROR,
			"@stylistic/no-whitespace-before-property": ERROR,
			"@stylistic/object-curly-newline": ERROR,
			"@stylistic/object-curly-spacing": [ERROR, "always"],
			"@stylistic/padded-blocks": [ERROR, "never"],
			"@stylistic/quotes": [ERROR, "double", { "allowTemplateLiterals": true }],
			"@stylistic/semi-spacing": ERROR,
			"@stylistic/semi-style": ERROR,
			"@stylistic/semi": [ERROR, "always"],
			"@stylistic/space-before-blocks": ERROR,
			"@stylistic/space-before-function-paren": [ERROR, "never"],
			"@stylistic/space-in-parens": ERROR,
			"@stylistic/space-infix-ops": ERROR,
			"@stylistic/spaced-comment": ERROR,
			"@stylistic/switch-colon-spacing": ERROR,
			"@stylistic/type-annotation-spacing": ERROR,
		},
	},
];


/**
 * Browser Rules - ts and tsx
 *
 * @type {import("typescript-eslint").Config}
 */
const BrowserConfigs = [
	...tseslint.config({
		files: FileGlobs.browser,
		name: "whs-custom:browser",
		extends: [
			...tseslint.configs.recommended,

			// TODO: re-enable when eslint 9 compat
			/* jsxA11y.flatConfigs.recommended, */

			// TODO: re-enable when eslint 9 compat
			/* {
				name: "eslint-react:recommended",
				...eslintReactRecommended,
			}, */

		],
		settings: { react: { version: "detect" } },
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parserOptions: {
				project: true,
				tsconfigRootDir: path.join(__dirname),
			},
		},
		rules: {
			"react/react-in-jsx-scope": OFF,
			"react/prop-types": OFF,
			"react/display-name": OFF,
			"@typescript-eslint/no-explicit-any": OFF,
			"@typescript-eslint/no-unsafe-any": OFF,
			"@typescript-eslint/no-unused-vars": [ERROR, { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
			"@typescript-eslint/member-ordering": ["error", {
				"default": [
					"constructor",
					"public-instance-method",
					"protected-instance-method",
					"private-instance-method",
					"instance-field",
					"static-field",
				],
			}],
			"@typescript-eslint/explicit-member-accessibility": ["error", {
				"accessibility": "explicit",
				"overrides": {
					"constructors": "no-public",
				},
			}],
			"@typescript-eslint/array-type": "error",
			"@typescript-eslint/prefer-for-of": "error",
			"@typescript-eslint/explicit-function-return-type": "off", // INFER FOR LIFE
			"@typescript-eslint/strict-boolean-expressions": "error",
			"@typescript-eslint/no-unnecessary-condition": "error",
			"@typescript-eslint/no-shadow": "error",
		},
	}),
];


/**
 * commonjs code - js and cjs
 *
 * @type {FlatConfigWithName[]}
 */
const CjsConfigs = [
	{
		...eslintNode.configs["flat/recommended-script"],
		name: "eslint-node-cjs",
		files: FileGlobs.cjs,
		rules: {
			...eslintNode.configs["flat/recommended-script"].rules,
			"no-unused-vars": [ERROR, { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
			"no-shadow": ERROR,
		},
	},
];


/**
 * Module code
 *
 * @type {FlatConfigWithName[]}
 */
const EsmConfigs = [
	{
		...eslintNode.configs["flat/recommended-module"],
		name: "eslint-node-module",
		files: FileGlobs.esm,
		rules: {
			...eslintNode.configs["flat/recommended-module"].rules,
			"no-unused-vars": [ERROR, { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
			"no-shadow": ERROR,
		},
	},
];

/**
 * global ignore folders
 *
 * @type {FlatConfigWithName}
 */
const Ignore = {
	ignores: ["Arc", "dist", "build", ".output", "vite.config.ts"],
};


/** @type {FlatConfigWithName[]} */
module.exports = [
	Ignore,
	...CommonCodeConfigs,
	...CjsConfigs,
	...EsmConfigs,
	...BrowserConfigs,
];
