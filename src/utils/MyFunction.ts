import crypto from 'crypto-js';
import {env} from "./MyVariables";

export function decrypt(text: string) : string {
    if(text){
        return crypto.AES.decrypt(text, env.encryptObject).toString(crypto.enc.Utf8);
    }
    else{
        return '';
    }
}

