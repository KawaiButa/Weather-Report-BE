import express, { Router } from "express"
import { loadHtmlFile, sendEmail } from "../controller/emailApis"
import redis from "../core/redis"
import randomatic from "randomatic"

const emailRouter: Router = express.Router()

emailRouter.post("/subscribe", async (req, res, next) => {
    console.log(req.body)
    if (!req.body.email) {
        res.status(400).send("Missing email field")
        return
    }
    if (await redis.get(`user/${req.body.email}`)) {
        res.status(409).send("The email has already been subscribed.")
        return
    }
    let html = await loadHtmlFile("statics/emailVerification.html")
    const key = randomatic("A0", 10)
    await redis.set(key, req.body.email as string)
    redis.set(`user/${req.body.email}`, 0)
    html = html.replace("verification_link", `${process.env.FRONTEND_URL}verification?key=${key}&expire=${Date.now() + 300000}`)
    sendEmail(process.env.GMAIL_USER ?? "", req.body.email as string, "Confirmation mail for Weather Report Subscription", html)
    res.sendStatus(200)

})
emailRouter.post("/verify", async (req, res, next) => {
    if (!req.body.expire || !req.body.key) {
        res.status(400).send('Missing body in the url')
        return
    }
    if (Number.parseInt(req.body.expire as string) < Date.now()) {
        console.log(`${Date.now()} is bigger than ${Number.parseInt(req.body.expire as string)}`)
        res.status(400).send("The verification link is expired")
        return
    }
    console.log("Start verify the key in the redis db")
    const user = await redis.get(`${req.body.key}`)
    await redis.del(`${req.body.key}`)
    if (user) {
        redis.set(`user/${user}`, 1)
        res.sendStatus(200)
    }
    else
        res.sendStatus(200)


})
emailRouter.post("/unsubscribe", async (req, res, next) => {
    if (!req.body.email) {
        res.status(400).send("Missing email field")
        return
    }
    const user = await redis.get(`user/${req.body.email}`)
    if (!user) {
        res.status(404).send("The email is not subscribed")
        return
    }
    if (user == "0") {
        res.status(422).send("The email is subscribed but not verified.")
        return
    }
    await redis.del(`user/${req.body.email}`)
    res.sendStatus(200)


})
export default emailRouter

