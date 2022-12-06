const discord = require("discord.js")
const client = new discord.Client()

let token = "YOUR DISCORD BOT TOKEN"
let custom_s = "STATUS"
let server_id = "YOUR DISCORD SERVER ID"
let role_id = "YOUR ROLE ID"

client.on("ready", async () =>
{
  setInterval(function()
    {
        client.guilds.cache.get(server_id).members.fetch().then((members) =>
        {
            members.forEach(async user =>
            {
                user.presence.activities.forEach(async activity =>
                {
                    if (activity.type === 'CUSTOM_STATUS' && activity.state.includes(custom_s) && !user.roles.cache.has(role_id))
                    {
                        await user.roles.add(role_id).catch(() =>
                        {})
                    }
                    else if (activity.type != 'Custom Status' && user.roles.cache.has(role_id))
                    {
                        await user.roles.remove(role_id).catch(() =>
                        {})
                    }
                    else if (activity.type === 'CUSTOM_STATUS' && !activity.state.includes(custom_s) && user.roles.cache.has(role_id))
                    {
                        await user.roles.remove(role_id).catch(() =>
                        {})
                    }
                })
            })
        })
    }, 1500)
})

client.login(token)
