import { ExtendedError, MapCollection } from "@ts-core/common";
import * as _ from 'lodash';

export abstract class DocumentParser<T = any> extends MapCollection<IDocument> {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    protected rootKey: string;
    protected translation: T;

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(rootKey?: string) {
        super('title');
        this.rootKey = rootKey;
    }

    // --------------------------------------------------------------------------
    //
    //  Protected Methods
    //
    // --------------------------------------------------------------------------

    protected isValueString(key: string): boolean {
        return _.isString(_.get(this.translation, key));
    }

    protected isValueArray(key: string): boolean {
        return _.isArray(_.get(this.translation, key));
    }

    protected isKeyDescription(key: string): boolean {
        return key.includes('Description');
    }

    protected isHasTranslation(key: string): boolean {
        return !_.isNil(this.translate(key));
    }

    protected translate(key: string): string {
        return _.get(this.translation, key);
    }

    protected getValue<T = any>(key: string): T {
        return _.get(this.translation, key);
    }

    protected getNumberKeys(key: string): Array<string> {
        return Object.keys(this.translation[key]).filter(key => !_.isNaN(parseInt(key)));
    }

    protected addItem(item: IDocument, items: Array<IDocument>): IDocument {
        items.push(item);
        return item;
    }

    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------

    public async parse(translation?: T): Promise<void> {
        if (!_.isNil(translation)) {
            this.translation = translation;
        }
        if (_.isNil(this.translation)) {
            throw new ExtendedError(`Unable to parse: translation is invalid`);
        }
        this.clear();
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        this.translation = null;
    }
}

export interface IDocument {
    title: string;
    content: string;
    metadata: any;
}