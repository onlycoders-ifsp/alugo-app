import { eBack_urls } from "./eBack_urls";
import { eItemML } from "./eItemML";

export class ePreferenciaML {
    items:eItemML[];
    notification_url: string;
    statement_descriptor:string;
    external_reference:string;
    auto_return:string;
    expiration_date_from:string;
    expiration_date_to:string;
    expires:boolean;
    back_urls: eBack_urls;
}