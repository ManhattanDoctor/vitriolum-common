import * as _ from 'lodash';

export class ConversationUtil {
    // --------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    // --------------------------------------------------------------------------

    public static getRoom(id: number): string {
        return `conversation${id}`;
    }
}