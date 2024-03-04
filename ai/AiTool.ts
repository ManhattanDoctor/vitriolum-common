export enum AiToolType {
    SERP = 'SERP',
    BING = 'BING',
    AMAZON = 'AMAZON',
    TAVILY = 'TAVILY',
    GOOGLE = 'GOOGLE',
    SERPER = 'SERPER',
    YOU_TUBE = 'YOU_TUBE',
    WIKIPEDIA = 'WIKIPEDIA',
    GOOGLE_NEWS = 'GOOGLE_NEWS',
    WOLFRAM_ALPHA = 'WOLFRAM_ALPHA',
}

export interface IAiToolConsumption {
    type: AiToolType;
    value: number;
}