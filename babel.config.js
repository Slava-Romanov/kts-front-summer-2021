module.exports = (api) => {
    api.cache.using(() => process.env.NODE_ENV);

    const presets = [
        ['@babel/preset-env', { loose: true }],
        '@babel/preset-react',
        '@babel/preset-typescript',
        'mobx'
    ];

    const plugins = [
        '@babel/plugin-proposal-optional-chaining',
        process.env.NODE_ENV === 'development' && 'react-refresh/babel',
        // ['@babel/plugin-proposal-private-methods', { loose: true }],
        // ['@babel/plugin-proposal-class-properties', { loose: true }]
        // ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
    ].filter(Boolean);

    return {
        presets,
        plugins
    };
};
