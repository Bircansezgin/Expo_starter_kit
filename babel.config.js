module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: false,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': ['./src'],
            '@/hooks': ['./src/hooks'],
            '@/components': ['./src/components'],
            '@/screens': ['./src/screens'],
            '@/services': ['./src/services'],
            '@/types': ['./src/types'],
            '@/utils': ['./src/utils'],
            '@/constants': ['./src/constants'],
            '@/contexts': ['./src/contexts'],
            '@/providers': ['./src/providers'],
            '@/navigation': ['./src/navigation'],
            '@/data': ['./src/data'],
            '@/config': ['./src/config']
          }
        }
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
