import { ITraceable } from '@ts-core/common';
import { AnonymizeMark, AnonymizeWarning, IAnonymizeOptions, IAnonymizeVault } from '../../anonymize';

export interface IFileContentAnonymizeDto extends ITraceable {
    id: number;
    options?: IAnonymizeOptions;
}

/**
 * Текст файла с метками или вымышленными людьми и таблица меток. Таблица — это сами персональные
 * данные: её показывают владельцу файла, но в модель и в анонимную копию она не попадает
 */
export interface IFileContentAnonymizeDtoResponse extends ITraceable {
    content: string;
    vault: IAnonymizeVault;
    warnings: Array<AnonymizeWarning>;
    /** Где в тексте стоят замены: показ их подсвечивает */
    marks: Array<AnonymizeMark>;
    symbols: number;
}

/** Обратная замена любого текста по таблице: так проверяют, что из ответа модели данные вернутся */
export interface IFileContentDeanonymizeDto extends ITraceable {
    content: string;
    vault: IAnonymizeVault;
}

export interface IFileContentDeanonymizeDtoResponse extends ITraceable {
    content: string;
    warnings: Array<AnonymizeWarning>;
}
