import { FilePictureExtensions } from "../file";

export enum PersonFileType {
    AVATAR = 'AVATAR',
    AVATAR_SMALL = 'AVATAR_SMALL',
    PICTURE = 'PICTURE',
}

export const PersonFileAllowExtensions = [...FilePictureExtensions];
