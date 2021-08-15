# SSO UI Helper

Just a simple helper library to authenticate with SSO UI.

The goal is different from [sso-ui](https://www.npmjs.com/package/sso-ui) npm package. That package is only available for use with Express. While this library tries to be framework agnostic.

## Using

```js
import SSOClient from "node-sso-ui";

// Service URL refers to your *callback* route.
const serviceUrl = "http://localhost:3000/callback";

// Initialize the client with that service URL
const client = new SSOClient(serviceUrl);

// Client attributes
client.loginUrl; // Use this to redirect your users when logging in

// As for the other two, you generally won't use it.
client.serviceUrl;
client.authUrl;

// Authenticating
ticket = "..."; // Ticket taken after logging in
const user: SSOUser = client.authenticate(ticket);
```

Example with Express.js is available in `examples` folder.

## API

### SSOClient

#### Functions

| Function     | Parameters                                                         | Returns                |
| ------------ | ------------------------------------------------------------------ | ---------------------- |
| constructor  | serviceUrl: string<br />The callback URL                           | -                      |
| getLogOutUrl | redirectUrl: string \| null<br />URL to redirect after logging out | string The log out URL |
| authenticate | ticket: string<br />Ticket taken from SSO after logging in         | SSOUser                |

#### Attributes

| Attribute  | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| serviceUrl | string | The service callback URL.            |
| loginUrl   | string | Log in URL for users to redirect to. |
| authUrl    | string | URL to fetch the user data from.     |

### SSOUser

#### Attributes

| Attribute   | Type               | Description                                   |
| ----------- | ------------------ | --------------------------------------------- |
| user        | string             | User's user name                              |
| attributes  | UserAttribute      | User's attributes, such as NPM, role.         |
| programInfo | ProgramInformation | Information about the user's current program. |

### UserAttribute

#### Attributes

| Attribute  | Type   | Description                            |
| ---------- | ------ | -------------------------------------- |
| ldap_cn    | string | Unknown, seems to be user's full name. |
| kd_org     | string | Selected study program ID.             |
| peran_user | string | User's current role.                   |
| nama       | string | User's full name.                      |
| npm?       | string | User's NPM.                            |
| nim?       | string | User's NIM.                            |

### ProgramInformation

#### Attributes

| Attribute           | Type   | Description                        |
| ------------------- | ------ | ---------------------------------- |
| faculty             | string | Program's faculty name.            |
| study_program       | string | Current study program's full name. |
| educational_program | string | The selected academic major name.  |
