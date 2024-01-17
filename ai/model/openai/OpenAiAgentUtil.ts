
import * as _ from 'lodash';
import { OpenAiAgentMessage, OpenAiAgentMessageContentType } from './OpenAiAgentMessage';

export class OpenAiAgentUtil {
    // --------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    // --------------------------------------------------------------------------

    public static getRoom(id: number): string {
        return `openAiAgent${id}`;
    }

    public static messageHasTextContent(item: OpenAiAgentMessage): boolean {
        return !_.isEmpty(OpenAiAgentUtil.messageGetTextContent(item));
    }

    public static messageGetTextContent(item: OpenAiAgentMessage): string {
        if (_.isEmpty(item.contents)) {
            return null;
        }
        let value = '';
        for (let content of item.contents) {
            if (content.type === OpenAiAgentMessageContentType.TEXT) {
                value += `${content.value}\n`;
            }
        }
        value = value.trim();
        return !_.isEmpty(value) ? value : null;
    }
}