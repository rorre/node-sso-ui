import { UserAttribute, ResponseUserData, ProgramInformation } from "./types";
const additionalInfo: {
    [key: string]: ProgramInformation;
} = require("./additional-info.json");

export default class SSOUser {
    user: string;
    attributes: UserAttribute;
    programInfo: ProgramInformation | null;

    constructor(userData: ResponseUserData) {
        this.user = userData.user[0];

        let userAttributes = userData.attributes[0];
        this.attributes = {
            ldap_cn: userAttributes.ldap_cn[0],
            kd_org: userAttributes.kd_org[0],
            peran_user: userAttributes.peran_user[0],
            nama: userAttributes.nama[0],
        };

        if ("npm" in userAttributes) {
            this.attributes.npm = userAttributes.npm[0];
        } else if ("nim" in userAttributes) {
            this.attributes.nim = userAttributes.nim[0];
        }

        if (this.attributes.kd_org in additionalInfo) {
            this.programInfo = additionalInfo[this.attributes.kd_org];
        } else {
            this.programInfo = null;
        }
    }
}
