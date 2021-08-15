import SSOClient from "../src/index";
import express from "express";

const app = express();
const ssoClient = new SSOClient("http://localhost:3000/callback");

app.get("/callback", async (req, res) => {
    /* Pretend we have a lot of log in operations.
       In real world application, do NOT respond here, as the ticket will be
       shown in the URL bar. And if the user presses refresh, the tick will
       no longer be valid, therefore you will run into unfun situations. */
    try {
        const user = await ssoClient.authenticate(req.query.ticket as any);
        res.send(
            `<p>Hello, ${user.attributes.nama}. <a href="/logout">Click here</a> to log out.</p>`
        );
    } catch (err) {
        res.send((err as Error).message);
    }
});

app.get("/", (req, res) => {
    res.send(`<p>To log in, please <a href="/login">click here</a>.</p>`);
});

app.get("/login", (req, res) => {
    res.redirect(ssoClient.loginUrl);
});

app.get("/logout", (req, res) => {
    // Pretend we have a lot of log out operations.
    res.redirect(ssoClient.getLogOutUrl("http://localhost:3000/"));
});

app.listen(3000, () => {
    return console.log(`Server is listening on port 3000`);
});
