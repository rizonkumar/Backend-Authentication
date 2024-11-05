# JWT (JSON Web Token)

**JWT (JSON Web Token)** is a widely used standard for securely transmitting information between parties as a JSON object. It’s commonly used in web applications to handle **authentication** and **authorization** in a stateless, secure, and compact manner.

---

## Simple Explanation

- **What It Is**: JWT is a **token** that represents claims about an entity (usually the user) and allows applications to verify identity without storing session information on the server.
- **Why It’s Useful**: Unlike traditional session cookies, JWT is **stateless**, meaning the server doesn’t need to keep a session for each logged-in user. This makes it ideal for **scalable** and **distributed systems**.
- **Example**: When you log into a website, the server generates a JWT and sends it to your browser. The browser stores the token and includes it in future requests, allowing the server to recognize you without re-authentication.

---

## Technical Explanation

### Structure of a JWT

A JWT consists of **three parts**, separated by dots (`.`):

1. **Header**
2. **Payload**
3. **Signature**

**Example JWT**:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE2Mzg0MDM2MDB9.HS256signedtoken
```

#### 1. Header

The header typically consists of two parts:

- The **type** of the token, which is JWT.
- The **algorithm** used for signing, such as HMAC SHA256 or RSA.

**Example Header (JSON format)**:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### 2. Payload

The payload contains the **claims**. Claims are statements about the user and additional data. There are several types of claims:

- **Registered claims**: Standardized claims like `iss` (issuer), `exp` (expiration), `sub` (subject), `aud` (audience).
- **Public claims**: Custom claims defined by applications, such as user ID or role.
- **Private claims**: Custom claims shared only between the issuer and consumer.

**Example Payload (JSON format)**:

```json
{
  "username": "johndoe",
  "role": "admin",
  "exp": 1638403600
}
```

#### 3. Signature

The signature is created by encoding the header and payload, and then signing it using a secret key or a private key.

- This step ensures the token is **tamper-resistant**.
- For example, using HMAC SHA256, the signature would look like this:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

The resulting token is **compact, URL-safe**, and can be easily passed in HTTP headers, allowing stateless authentication.

### How JWT Works: Authentication Flow

Here’s a step-by-step breakdown of the JWT authentication flow:

1. **User Login**: The user logs in with credentials (e.g., username and password).
2. **Token Issuance**: The server validates the credentials, creates a JWT containing user information and permissions, signs it, and sends it back to the client.
3. **Client Stores Token**: The client (e.g., web browser or mobile app) stores the token, typically in **local storage** or a **cookie**.
4. **Token Sent with Requests**: For each subsequent request, the client sends the JWT in the `Authorization` header (e.g., `Authorization: Bearer <token>`).
5. **Token Verification**: The server verifies the token’s signature and expiration. If valid, it processes the request and returns the response.
6. **Access Control**: The server uses claims in the token to grant or deny access to resources, without needing to look up session data.

---

## Diagrammatic Representation of JWT Flow

```plaintext
 +--------------------+
 |   User             |
 +--------------------+
           |
           | (1) Login with credentials
           v
 +--------------------+
 |   Auth Server      |
 +--------------------+
           |
           | (2) Generate JWT
           v
 +--------------------+
 | JWT {Header.Payload.Signature} |
 +--------------------+
           |
           | (3) Send JWT to Client
           v
 +--------------------+
 |   Client           |
 +--------------------+
           |
           | (4) Send JWT in HTTP headers with each request
           v
 +--------------------+
 |   Resource Server  |
 +--------------------+
           |
           | (5) Verify JWT & check claims
           v
 +--------------------+
 |   Authorized/Denied|
 +--------------------+
```

---

## Key Advantages of JWT

- **Stateless**: No server-side storage, which improves scalability.
- **Compact & Portable**: JWTs are small and easy to transmit in HTTP headers or as URL parameters.
- **Secure**: Tokens are signed to prevent tampering, and sensitive information can be encrypted if needed.
- **Versatile**: Can be used across multiple domains and applications, supporting SSO (Single Sign-On).

---

## Example Code Snippet for JWT Verification

```javascript
const jwt = require("jsonwebtoken");

const secretKey = "your_secret_key";
const token = "<your_jwt_here>";

try {
  // Decode and verify the JWT
  const decoded = jwt.verify(token, secretKey);

  // Check expiration manually (optional, as jwt.verify does this automatically)
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (decoded.exp && currentTimestamp > decoded.exp) {
    console.log("Token has expired");
  } else {
    console.log("Token is valid:", decoded);
  }
} catch (error) {
  if (error.name === "TokenExpiredError") {
    console.log("Token has expired");
  } else {
    console.log("Invalid token");
  }
}
```

---

This structure provides a clear understanding of JWT, from its basic definition to the technical flow, along with a code example to demonstrate how it works in practice.
