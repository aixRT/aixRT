# Detailed Guide: API Testing with Postman for Virtuals Protocol

## Setting Up Your Environment

### 1. Initial Postman Setup

First, let's set up a proper testing environment in Postman:

1. Open Postman
2. Click on "Environments" in the left sidebar
3. Click the "+" button to create a new environment
4. Name it "Virtuals Protocol Development"
5. Add the following variables:

```plaintext
VARIABLE           INITIAL VALUE                 DESCRIPTION
baseURL           https://api.virtuals.io/api    Base API endpoint
apiKey            [Your API Key]                 Your Virtuals API key
agentUid          [Leave blank]                  Will be set by tests
accessToken       [Leave blank]                  Will be set by tests
runner            [Leave blank]                  Will store runner URL
```

### 2. Creating Your First Collection

1. Click on "Collections" in the left sidebar
2. Click the "+" to create a new collection
3. Name it "Virtuals Protocol Testing"
4. In the collection settings:
   - Go to "Variables" tab
   - Add the same variables as the environment (they'll be used as fallbacks)

### 3. Organizing Your Requests

Create the following folder structure in your collection:

```plaintext
Virtuals Protocol Testing/
├── Authentication/
│   ├── Get Agent UID
│   └── Get Access Token
├── Agent Module/
│   ├── Basic Interaction
│   └── Advanced Features
└── Conversation Agent/
    ├── Start Conversation
    └── Continue Chat
```

## Creating Essential Test Requests

### 1. Get Agent UID

1. Create a new request in the Authentication folder
2. Set up the request:
   ```plaintext
   Method: GET
   URL: {{baseURL}}/virtuals/:virtualId
   ```
3. Add a test script to save the agent UID:
   ```javascript
   pm.test("Save Agent UID", function () {
       var jsonData = pm.response.json();
       pm.environment.set("agentUid", jsonData.data.uid);
   });
   ```

### 2. Get Access Token

1. Create another request in the Authentication folder
2. Set up the request:
   ```plaintext
   Method: POST
   URL: {{baseURL}}/accesses/tokens
   Headers:
     X-API-KEY: {{apiKey}}
   Body:
     {
       "data": {
         "userUid": "your-user-id",
         "virtualUid": "{{agentUid}}"
       }
     }
   ```
3. Add a test script to save the access token:
   ```javascript
   pm.test("Save Access Token", function () {
       var jsonData = pm.response.json();
       pm.environment.set("accessToken", jsonData.data.accessToken);
       
       // Extract and save runner URL from token claims
       var tokenParts = jsonData.data.accessToken.split('.');
       var claims = JSON.parse(atob(tokenParts[1]));
       pm.environment.set("runner", claims.runner);
   });
   ```

## Best Practices

### 1. Environment Management
- Never hardcode values
- Use environment variables for all configurable items
- Keep separate environments for development/testing

### 2. Testing
- Add tests to verify response status
- Validate response structure
- Check for expected data types
- Test error scenarios

### 3. Security
- Never commit API keys
- Rotate test credentials regularly
- Use collection-level auth when possible

### 4. Documentation
- Add descriptions to requests
- Document expected responses
- Include example payloads
- Note any special requirements

## Common Issues and Solutions

### 1. Authentication Errors
- Check API key format
- Verify token expiration
- Confirm proper header format

### 2. Request Failures
- Validate JSON syntax
- Check required fields
- Verify endpoint URLs
- Confirm content types

### 3. Environment Issues
- Update variable values
- Check environment selection
- Verify variable scope
- Clear cached values if needed
