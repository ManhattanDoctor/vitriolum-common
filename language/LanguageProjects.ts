import { ILanguageProjectSettings } from '@ts-core/language';

export let LanguageProjects: Array<ILanguageProjectSettings> = [
    {
        name: 'gnosisai',
        locales: ['ru', 'en'],
        prefixes: [
            '.json',
            'Custom.json',

            'Ai.json',
            'User.json',
            'Coin.json',
            'File.json',
            'About.json',
            'Voice.json',
            'Payment.json',
            'Management.json',
            'Conversation.json',

            'Gnosisai.json',
            'Server.json'
        ]
    },
    {
        name: 'gnosisai-lite',
        locales: ['ru', 'en'],
        prefixes: [
            '.json',
            'Custom.json',

            'Ai.json',
            'User.json',
            'Coin.json',
            'File.json',
            'About.json',
            'Conversation.json',

            'Lite.json'
        ]
    },
    {
        name: 'gnosisai-saccus',
        locales: ['ru', 'en'],
        prefixes: [
            '.json',
            'Custom.json',

            'Ai.json',
            'User.json',
            'Coin.json',
            'File.json',
            'About.json',
            'Conversation.json',

            'Saccus.json'
        ]
    }
]
