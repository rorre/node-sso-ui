import axios from "axios";
import xml2js from "xml2js";
import { CASResponse } from "./types";
import SSOUser from "./user";

export default class SSOClient {
    ssoUrl: string = "https://sso.ui.ac.id/cas2";
    serviceUrl: string;
    loginUrl: string;
    authUrl: string;

    constructor(serviceUrl: string) {
        this.serviceUrl = serviceUrl;
        this.loginUrl = `${this.ssoUrl}/login?service=${serviceUrl}`;
        this.authUrl = `${this.ssoUrl}/serviceValidate?service=${serviceUrl}&ticket=`;
    }

    getLogOutUrl(redirectUrl: string) {
        let logoutUrl = this.ssoUrl + "/logout";
        if (redirectUrl) logoutUrl += "?url=" + redirectUrl;
        return logoutUrl;
    }

    async authenticate(ticket: string) {
        let fetchUrl = this.authUrl + ticket;
        const userFetchData = await axios.get<string>(fetchUrl);
        const parsedResponse = (await xml2js.parseStringPromise(
            userFetchData.data,
            {
                trim: true,
                tagNameProcessors: [xml2js.processors.stripPrefix],
            }
        )) as CASResponse;

        if ("authenticationSuccess" in parsedResponse.serviceResponse) {
            return new SSOUser(
                parsedResponse.serviceResponse.authenticationSuccess[0]
            );
        } else if ("authenticationFailure" in parsedResponse.serviceResponse) {
            throw new Error(
                "Error from server: " +
                    parsedResponse.serviceResponse.authenticationFailure[0]["$"]
                        .code
            );
        }
        throw new Error("Unknown error occured.");
    }
}
