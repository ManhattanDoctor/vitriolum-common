
import * as _ from 'lodash';

export class ShareUtil {
    //--------------------------------------------------------------------------
    //
    // 	Static Properties
    //
    //--------------------------------------------------------------------------

    public static VK_URL = 'https://vk.com/gnosisai';
    public static SITE_URL = 'https://gnosisai.ru';
    public static ASSETS_URL = 'https://vk.occultist.one/gnosisai/assets';
    public static SACCUS_SITE_URL = 'https://saccus.gnosisai.ru';
}

export interface IShareUrl {
    vk?: string,
    web?: string,
    picture?: string,
    fragment?: string;
    application?: string,
}
