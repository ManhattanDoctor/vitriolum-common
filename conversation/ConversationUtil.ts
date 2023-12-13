import { ConversationMessage, ConversationMessageContentType } from "./ConversationMessage";
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

    public static messageHasTextContent(item: ConversationMessage): boolean {
        return !_.isEmpty(ConversationUtil.messageGetTextContent(item));
    }

    public static messageGetTextContent(item: ConversationMessage): string {
        if (_.isEmpty(item.contents)) {
            return null;
        }
        let value = '';
        for (let content of item.contents) {
            if (content.type === ConversationMessageContentType.TEXT) {
                value += `${content.value}\n`;
            }
        }
        return value.trim();
    }
}