import { ILanguageProjectSettings } from '@ts-core/language';

export let LocaleProjects: Array<ILanguageProjectSettings> = [
    {
        name: 'gnosisai',
        locales: ['en', 'ru'],
        prefixes: [
            '.json',
            'Custom.json',

            'Ai.json',
            'User.json',
            'Coin.json',
            'File.json',
            'About.json',
            'Payment.json',
            'Management.json',
            'Conversation.json',

            'Gnosisai.json',
            'Server.json'
        ]
    },
    {
        name: 'gnosisai-lite',
        locales: ['en', 'ru'],
        prefixes: [
            '.json',
            'Custom.json',

            'Ai.json',
            'User.json',
            'File.json',
            'About.json',
            'Conversation.json',

            'Lite.json'
        ]
    },
    {
        name: 'gnosisai-saccus',
        locales: ['en', 'ru'],
        prefixes: [
            '.json',
            'Custom.json',

            'Ai.json',
            'User.json',
            'File.json',
            'About.json',
            'Conversation.json',

            'Saccus.json'
        ]
    }
]
