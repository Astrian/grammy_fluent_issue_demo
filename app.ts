import Dotenv from "dotenv"
import { Bot, Context } from "grammy"
import { Fluent } from "@moebius/fluent"
import { FluentContextFlavor, useFluent } from "@grammyjs/fluent"

const fluent = new Fluent()
Dotenv.config()

const initialLocales = async () => {
  await fluent.addTranslation({
    locales: "zh-hans",
    filePath: ["./locales/zh-hans.ftl"]
  })
  await fluent.addTranslation({
    locales: "en",
    filePath: ["./locales/en.ftl"]
  })
}

initialLocales()

export type BotContext = ( & Context & FluentContextFlavor )

if (!process.env.token) {
  throw(new Error("You must define token to use this bot."))
}

const bot = new Bot<BotContext>(process.env.token || "")

bot.use(useFluent({ fluent, defaultLocale: "en"}))

bot.command("start", async ctx => {
  await ctx.reply(ctx.t("welcome", {language: ctx.message?.from.language_code || "No language code detected"}))
})

bot.start()