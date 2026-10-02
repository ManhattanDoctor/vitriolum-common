import { ApiProperty, ApiPropertyOptional } from '@ts-core/swagger';

/**
 * Каких людей прятать. В договоре или выписке — всех; в статье или книге большинство имён — Платон
 * и Кант, и без них модель не поймёт текст, поэтому там прячутся только частные лица:
 * с полным отчеством или в полях документа
 */
export enum AnonymizePeople {
    ALL = 'ALL',
    PRIVATE = 'PRIVATE'
}

/** Виды персональных данных, которые различает сервис анонимизации */
export enum AnonymizeType {
    PERSON = 'PERSON',
    ADDRESS = 'ADDRESS',
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    PASSPORT = 'PASSPORT',
    BIRTH_DATE = 'BIRTH_DATE',
    INN = 'INN',
    SNILS = 'SNILS',
    OGRN = 'OGRN',
    CARD = 'CARD',
    ACCOUNT = 'ACCOUNT',
    DOCUMENT = 'DOCUMENT'
}

/** Не заданное решает сам сервис анонимизации своими настройками */
export interface IAnonymizeOptions {
    people?: AnonymizePeople;
    /** Вымышленные люди вместо меток для русских имён */
    surrogates?: boolean;
    /** Не задано — все виды */
    types?: Array<AnonymizeType>;
    /** Что прятать всегда, даже если сервис этого не находит: фамилия, название проекта. В любом падеже */
    hide?: Array<string>;
    /** Что не прятать никогда, например название банка-партнёра */
    keep?: Array<string>;
}

/** Метка → исходное значение. Это сами персональные данные: в модель таблица не отправляется */
export type IAnonymizeVault = Record<string, string>;

/**
 * Где анонимизация могла не справиться: имена на языке, которого сервис не знает, или вымышленное
 * имя, которое модель переиначила и которое не вернулось. Сами данные сюда не попадают
 */
export class AnonymizeWarning {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    @ApiProperty({ description: 'LANGUAGE_LIMITED, LANGUAGE_UNSUPPORTED — names may be missed; SURROGATE_LEFT, LABEL_UNKNOWN — something was not put back' })
    public code: string;
    @ApiPropertyOptional({ description: 'Language code, the made-up name or the label the warning is about' })
    public value?: string;
}
