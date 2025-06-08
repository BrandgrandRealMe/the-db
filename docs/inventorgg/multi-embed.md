---
title: Multi Embed
---
# 📬 Sending Multiple Embeds via `channels/{id}/messages`

This guide shows how to use Inventor.gg’s **Network Request** block to send multiple Discord embeds using the official `https://discord.com/api/v10/channels/{channel.id}/messages` endpoint.

---

## 🔧 Requirements

- A valid **Bot Token** with `Send Messages` permission
- The **Channel ID** you want to post to
- Inventor.gg with **Network Request** block

---

## 🔗 Endpoint

Use this URL:

`https://discord.com/api/v10/channels/YOUR_CHANNEL_ID/messages`

Replace `YOUR_CHANNEL_ID` with the actual channel ID you want the message sent to.

---

## 📮 Method

```txt
POST
````

---

## 🧾 Headers

You **must** include the following headers in the Network Request block:

```http
Authorization=Bot YOUR_BOT_TOKEN
```

> 🛑 Be sure to keep your bot token private.

---

## 🧬 Raw Body

Set the **Content Type** to `application/json` and paste this JSON:

```json
{
  "content": "Here's a message with multiple embeds!",
  "embeds": [
    {
      "title": "📌 First Embed",
      "description": "This is the first embed block.",
      "color": 5814783
    },
    {
      "title": "📌 Second Embed",
      "description": "This is the second embed block.",
      "color": 16711680
    }
  ]
}
```

---

## 🧪 Full Setup in Inventor.gg

### 1. Drag in a **Network Request** block.

### 2. Set:

| Field     | Value                                                                   |
| --------- | ----------------------------------------------------------------------- |
| URL       | `https://discord.com/api/v10/channels/YOUR_CHANNEL_ID/messages`         |
| Method    | `POST`                                                                  |
| Content-Type| `application/json`                                                    |
| Headers   | `Authorization=Bot YOUR_BOT_TOKEN`                                      |
| Body Type | Raw                                                                     |
| Raw Body  | (see JSON above)                                                        |

---

## 🧠 Notes

* You can send up to **10 embeds** per message.
* Each embed can include title, description, color, footer, timestamp, images, and fields.
* The bot must be **in the channel** and have **message sending permission**.

---

## 🆘 Troubleshooting

| Error            | Cause                                               |
| ---------------- | --------------------------------------------------- |
| 401 Unauthorized | Invalid or missing Bot token                        |
| 403 Forbidden    | Bot lacks permissions in the channel                |
| 400 Bad Request  | JSON format is incorrect or missing required fields |

---

## 💡 Tip

Use tools like [https://discohook.org](https://discohook.org) to design your embeds before copying the JSON into Inventor.gg.

---

## 📚 Related

* [Official Discord Docs](https://discord.com/developers/docs/resources/channel#create-message)