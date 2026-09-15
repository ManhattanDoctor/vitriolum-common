import { AiToolType } from '../ai';
import { McpServer, MCP_SERVER_UID_PATTERN } from './McpServer';
import * as _ from 'lodash';

export class McpServerUtil {
    // --------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    // --------------------------------------------------------------------------

    /**
     * The agent tools are plain strings: either a built in AiToolType value or an mcp server uid
     */
    public static isBuiltIn(item: string): boolean {
        return Object.values(AiToolType).includes(item as AiToolType);
    }

    public static isUidValid(item: string): boolean {
        return !_.isEmpty(item) && MCP_SERVER_UID_PATTERN.test(item);
    }

    public static getUids(items: Array<McpServer>): Array<string> {
        return !_.isEmpty(items) ? items.map(item => item.uid) : new Array();
    }
}
