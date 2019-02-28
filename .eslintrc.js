module.exports = {
	root: true,
	parser: "babel-eslint",
	parserOptions: {
		//设置"script"（默认）或"module"如果你的代码是在ECMAScript中的模块。
		sourceType: "module"
	},
	env: {
		node: true,
		browser: true
	},
	extends: ["plugin:prettier/recommended", "eslint:recommended"],
	globals: {
		document: false,
		window: false,
		chrome: false,
		browser: false
	},
	// required to lint *.vue files
	plugins: ["html", "prettier"],
	// add your custom rules here
	rules: {
		indent: ["error", 4, { SwitchCase: 1 }],
		quotes: ["error", "double"],
		// 空行最多不能超过100行
		"no-multiple-empty-lines": [0, { max: 100 }]
	}
};
