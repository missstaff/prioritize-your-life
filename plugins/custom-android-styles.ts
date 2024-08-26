import { withAndroidStyles } from '@expo/config-plugins';

export function withCustomStyles(config: any) {
    return withAndroidStyles(config, async config => {
        config.modResults = applyCustomStyles(config.modResults);
        return config;
    });
}

function applyCustomStyles(styles: any) {
    const appTheme = styles.resources.style.find((style: any) => style.$.name === 'AppTheme');
    if (appTheme) {
        appTheme.item.push({ _: '@style/Dialog.Theme', $: { name: 'android:datePickerDialogTheme' } });
        appTheme.item.push({ _: '@style/Dialog.Theme', $: { name: 'android:timePickerDialogTheme' } });
    }

    styles.resources.style.push({
        $: { name: 'Dialog.Theme', parent: 'Theme.AppCompat.Light.Dialog' },
        item: [{ _: '#CD03EF', $: { name: 'colorAccent' } }],
    });

    return styles;
}

export default withCustomStyles;
