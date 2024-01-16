import { OpenAiTextModel } from "../ai/model/openai";
import * as _ from "lodash";

export class AiUtil {

    // --------------------------------------------------------------------------
    //
    //  Public Static Methods
    //
    // --------------------------------------------------------------------------

    public static isModelSupportFile(model: string): boolean {
        switch (model) {
            case OpenAiTextModel.GPT_4_VISION_PREVIEW:
                return true;
        }
        return false;
    }

    public static isModelSupportStream(model: string): boolean {
        switch (model) {
            case OpenAiTextModel.GPT_4_VISION_PREVIEW:
                return false;
        }
        return true;
    }
}