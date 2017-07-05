const postcss = require('postcss');
const plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}


it('Handles light and dark theme property prefixes', () => {
    return run(`
.thing { 
  margin: 10px;
  light-color: $black;
}
`,
`
:global(.theme-light) .thing { 
  color: $black;
}
.thing { 
  margin: 10px;
}
`, {});
});
