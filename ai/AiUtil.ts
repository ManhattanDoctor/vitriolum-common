export class AiUtil {
    // --------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    // --------------------------------------------------------------------------

    public static getTaskRoom(session: string): string {
        return `task${session}`;
    }
}