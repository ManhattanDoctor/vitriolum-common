
import * as _ from 'lodash';

export class ShareUtil {
    //--------------------------------------------------------------------------
    //
    // 	Static Properties
    //
    //--------------------------------------------------------------------------

    public static VK_URL = 'https://vk.com/vitriolum';
    public static SITE_URL = 'https://vitriolum.one';
    public static ASSETS_URL = 'https://vk.vitriolum.one/person/assets';
}

export interface IShareUrl {
    vk?: string,
    web?: string,
    picture?: string,
    fragment?: string;
    application?: string,
}
