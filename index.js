const postcss = require('postcss');

module.exports = postcss.plugin('postcss-theme-shorthand', () => {
    const ThemedPropRegExp = /^(light|dark)-/;
    const LightThemeRegExp = /^light-/g;
    const DarkThemeRegExp = /^dark-/g;
    const LIGHT_THEME = '.theme-light';
    const DARK_THEME = '.theme-dark';

    // Holds a reference to the new css node for themeing,
    // in case multiple light-/dark- props in a single selector
    let currentLightNode;
    let currentDarkNode;

    function createNewNode(parent, selector) {
        return parent.cloneBefore({ selector }).removeAll();
    }

    function addLightThemedStyle({ parent, prop, value, source }) {
        const ruleSelectors = parent.selectors
            .map(ruleSelector => `:global(${LIGHT_THEME}) ${ruleSelector}`)
            .join(', ');

        if (!currentLightNode || currentLightNode.selector !== ruleSelectors) {
            currentLightNode = createNewNode(parent, ruleSelectors);
        }

        currentLightNode.append({
            prop: prop.replace(LightThemeRegExp, ''),
            value,
            source
        });
    }

    function addDarkThemedStyle({ parent, prop, value, source }) {
        const ruleSelectors = parent.selectors
            .map(ruleSelector => `:global(${DARK_THEME}) ${ruleSelector}`)
            .join(', ');

        if (!currentDarkNode || currentDarkNode.selector !== ruleSelectors) {
            currentDarkNode = createNewNode(parent, ruleSelectors);
        }

        currentDarkNode.append({
            prop: prop.replace(DarkThemeRegExp, ''),
            value,
            source
        });
    }

    function ruleHandler(decl) {
        const { prop } = decl;

        if (prop.match(LightThemeRegExp) !== null) {
            addLightThemedStyle(decl);
        } else if (prop.match(DarkThemeRegExp) !== null) {
            addDarkThemedStyle(decl);
        }

        decl.remove();
    }

    return function (css) {
        css.walkDecls(ThemedPropRegExp, ruleHandler);
    };
});
