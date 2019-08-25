# 优秀的ESLint规范实践
Airbnb: eslint-config-airbnb eslint-config-airbnb-base

# webpack与 CI/CS集成
# webpack与ESLint集成
`npm i -D eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-config-airbnb`
``` javascript
/* .eslintrc.js */
module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    }
}
```
增加 .eslintignore