import { IAiTask } from "./IAiTask";
import { IDidAvatarProgress, IDidAvatarResponse } from "../model/did";

export interface IAiAvatarTask extends IAiTask { }

export type AiAvatarTaskProgress = IDidAvatarProgress;

export type AiAvatarTaskResponse = IDidAvatarResponse;
