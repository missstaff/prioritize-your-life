const { withAndroidStyles } = require('@expo/config-plugins');

const withCustomStyles = config => {
    return withAndroidStyles(config, async config => {
        config.modResults = applyCustomStyles(config.modResults);
        return config;
    });
};

function applyCustomStyles(styles) {
    // Add items to the App Theme
    const appTheme = styles.resources.style.find(style => style.$.name === 'AppTheme');
    if (appTheme) {
        appTheme.item.push({ _: '@style/Dialog.Theme', $: { name: 'android:datePickerDialogTheme' } });
        appTheme.item.push({ _: '@style/Dialog.Theme', $: { name: 'android:timePickerDialogTheme' } });
    }

    // Add new style definition
    styles.resources.style.push({
        $: { name: 'Dialog.Theme', parent: 'Theme.AppCompat.Light.Dialog' },
        item: [{ _: '#a7243a', $: { name: 'colorAccent' } }],
    });

    return styles;
}

module.exports = withCustomStyles;