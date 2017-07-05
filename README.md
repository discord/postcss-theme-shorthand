# PostCSS Theme Shorthand [![Build Status][ci-img]][ci]

[PostCSS] plugin that allows the use of "light-" and "dark-" property prefixes for themeing.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/TheSisb/postcss-theme-shorthand.svg
[ci]:      https://travis-ci.org/TheSisb/postcss-theme-shorthand

```css
.thing {
	light-color: white;
	dark-color: black;
	color: red;
	light-background: black;
	dark-background: white;
}

.ballon, .garage {
	dark-color: red;
	light-color: blue;
}
```

```css
:global(.theme-light) .thing {
	color: white;
	background: black;
}

:global(.theme-dark) .thing {
	color: black;
	background: white;
}

.thing {
	color: red;
}

:global(.theme-dark) .ballon, :global(.theme-dark) .garage {
	color: red;
}

:global(.theme-light) .ballon, :global(.theme-light) .garage {
	color: blue;
}

.ballon, .garage {
}
```

## Usage

```js
postcss([ require('postcss-theme-shorthand') ])
```

See [PostCSS] docs for examples for your environment.
