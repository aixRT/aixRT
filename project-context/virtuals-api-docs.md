<aside>
⚠️

Note that this is a live document, which will be enhanced as we make more services available.

</aside>

<aside>
⚠️

Please reach out to the team regarding the production environment.

</aside>

# Integrating with Agents

## Pre-requisite: Obtain Agent UID

Go to https://app.virtuals.io, click the agent you would like to interact with.

You can see the `virtualId` at the address bar. For example, for Luna, it is `68`

Next, use our public API to query the agent’s details.

**Endpoint:** `GET <baseURL>/api/virtuals/:virtualId`

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/d1d81bab-3891-4ee5-ace8-8262c6c1c595/cecd6c1b-897f-49f9-8956-7ac8a20adcea/image.png)

The agent’s uid is the `uid` field returned from the API response

<aside>
💡

Please obtain an Agent API key to access the cognitive, voice, and visual core of any agent from Virtuals Protocol.

</aside>

---

## 1.0 Agent Module

**The Agent Module** is a service that allows users to directly communicate with the agent's models. It is stateless and does not retain memory between users and agents.

The Agent Module uses our "roleplay" template, so the prompt output is designed to reflect a roleplaying style.

### Step 1: Obtain Access Token

Each request requires an API token, which should be provided in the **X-API-KEY** header. This token will be used to obtain an access token from Virtuals Protocol for subsequent interactions.

**Endpoint:** `POST <baseURL>/api/accesses/tokens`

**Headers:**

- X-API-KEY: <Your API token>

**Request:**

```
{
    "data": {
        "userUid": "<userUid>", // Your user's unique id
        "virtualUid": "<virtualUid>" // The agent's uid retrieved from previous step
    }
}
```

**userUid** should be the unique user identifier in your system. It could be an email address, wallet address, or Telegram chat ID. This is critical to ensure that the user’s memory is synchronized across the platform.

**Response:**

```
{
    "data": {
        "accessToken": "<Your access token>"
    }
}
```

**Refresh your access token** by calling the same API if the token has expired or been invalidated.

### Step 2: Decode the Token

Extract the runner’s URL from the access token’s claims using `token.claims.runner`.

You can preview the token claims using tools like [jwt.io](http://jwt.io/).

The runner’s URL will be used for the next request.

### Step 3: Prompt the Agent Module

**Endpoint:** `POST <token.claims.runner>/prompts`

**Headers:**

- Authorization: Bearer `<access token>`

**Request Body:**

```
{
    "data": {
        "prompt": "<user's text prompt>"
    }
}
```

**Response:**

```
{
    "text": "<Text response from the LLM>"
}
```

As your agent’s capabilities grow through contributions, you may notice additional fields in the response, such as audio data, facial animation data, and sentiment analysis data.

---

## 2.0 Conversation Agent

The **Conversation Agent** is a wrapper around the Agent Module that provides opinionated short-term and long-term memory modules. It is designed to simplify integration with agents for conversational purposes, enabling users to retain memory with agents without having to manage it themselves.

<aside>
💡

Use the Conversation Agent if you want your agent to have opinionated short-term and long-term memory.

</aside>

### Step 1: Obtain Agent UID

Go to https://app.virtuals.io, click the agent you would like to interact with.

You can see the `virtualId` at the address bar. For example, for Luna, it is `68`

Next, use our public API to query the agent’s details.

**Endpoint:** `GET <baseURL>/api/virtuals/:virtualId`

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/d1d81bab-3891-4ee5-ace8-8262c6c1c595/cecd6c1b-897f-49f9-8956-7ac8a20adcea/image.png)

The agent’s uid is the `uid` field returned from the API response

### Step 2: Get Access Token

**Endpoint:** `POST <baseURL>/api/accesses/tokens`

**Headers:**

- X-API-KEY: `<Your API token>`

**Request:**

```
{
  "data": {
    "userUid": "<userUid>", // Your user's unique id
    "virtualUid": "<virtualUid>" // Agent uid
  }
}
```

**userUid** should be the unique user identifier in your system. It could be an email address, wallet address, or Telegram chat ID. This is critical to ensure that the user’s memory is synchronized across the platform.

**Response:**

```
{
    "data": {
        "accessToken": "<Your access token>"
    }
}
```

### Step 3: Prompt Conversation Agent

**Endpoint:** `POST [https://H7Uap4runner.tmole.virtuals.io/prompts](https://ffff40runner.tmole.virtuals.io/prompts)`

**Headers:**

- Authorization: Bearer `<access token>`

**Request Body:**

```
{
    "data": {
        "useCaseId": "roleplay",
        "text": "User message",
        "opponent": "User name",
        "additionalContext": "Additional context of the agent",
        "conversationUid": "conversation Uid (optional)"
    }
}
```

| **Field** | **Description** | **Example** |
| --- | --- | --- |
| useCaseId | Template to use for the Conversation Agent. It can be either **'roleplay'** or **'sfwroleplay'**:
**roleplay**: A standard roleplay template.
**sfwroleplay**: A roleplay template that prevents the LLM from returning NSFW content. | roleplay |
| text | User’s text message | How are you? |
| opponent | User’s name | User |
| additionalContext | Additional context of your agent | Luna is happy today.\n |
| conversationUid | (Optional) Setting **conversationUid** will tag the agent's short-term memory.
Each time the **conversationUid** changes, the short-term memory will be reset.e when a conversationUid has changed, the short term memory will be reset. | conversationId1 |

**Response:**

```
{
    "response": "LLM's text repsonse"
}
```

(

---

# Commonly Faced Issues

## I am getting 400 Error

Token has expired. Make sure you implement token refresh every 30mins 

## I am getting 500 Error

1. Make sure you are using the right base_url.
2. For payload, make sure you wrap it with “data”. Double check the request with the sample given above. 
3. Get help from support if (1) & (2) is correct