
import * as _ from 'lodash';

export class OpenAiAgentUtil {
    // --------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    // --------------------------------------------------------------------------

    public static getRoom(id: number): string {
        return `openAiAgent${id}`;
    }
}