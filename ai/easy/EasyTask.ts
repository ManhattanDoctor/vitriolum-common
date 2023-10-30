import { EasyClient } from "./EasyClient";
import { AiTask, IAiTaskProgress } from "../AiTask";

export abstract class EasyTask extends AiTask<any, any> {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    protected client: EasyClient;

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(client: EasyClient) {
        super();
        this.client = client;
    }

    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------

    protected async progressGet(): Promise<IAiTaskProgress> {
        return { current: 0, percent: 5, total: 100 };
    }

    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.client = null;
    }
} 