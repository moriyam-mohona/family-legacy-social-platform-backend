# Auth Module Request Payloads

These are the JSON payloads mapped to the Zod schemas for all endpoints in `auth.route.ts`. You can copy these directly into Postman or Thunder Client to test your APIs.

### 1. Register User
**Endpoint:** `POST /api/v1/auth/register`

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "strongPassword123",
  "gender": "MALE",
  "dob": "1990-01-01T00:00:00.000Z",
  "phone": "+1234567890",
  "image": "https://example.com/profile.jpg",
  "referralCode": "REF12345",
  "citizenship": "NATURALISED",
  "educationDetails": "BSc Computer Science",
  "relationshipStatus": "SINGLE",
  "workStatus": "Employed"
}
```
*(Note: Only `name`, `email`, `password`, `gender`, and `dob` are strictly required).*

---

### 2. Verify OTP (Create Account)
**Endpoint:** `POST /api/v1/auth/verify-otp`

```json
{
  "email": "johndoe@example.com",
  "otp": "123456",
  "type": "CREATE_ACCOUNT"
}
```

---

### 3. Login
**Endpoint:** `POST /api/v1/auth/login`

```json
{
  "email": "johndoe@example.com",
  "password": "strongPassword123"
}
```

---

### 4. Forgot Password
**Endpoint:** `POST /api/v1/auth/forgot-password`

```json
{
  "email": "johndoe@example.com"
}
```

---

### 5. Verify OTP (Forgot Password)
**Endpoint:** `POST /api/v1/auth/verify-otp`

```json
{
  "email": "johndoe@example.com",
  "otp": "123456",
  "type": "FORGET_PASSWORD"
}
```

---

### 6. Reset Password
**Endpoint:** `POST /api/v1/auth/reset-password`
*(Requires the `resetToken` returned from the verify-otp step in the `Authorization` header)*

**Headers:**
`Authorization: <resetToken>`

```json
{
  "newPassword": "newStrongPassword123"
}
```

---

### 7. Change Password
**Endpoint:** `PATCH /api/v1/auth/change-password`
*(Requires a standard `accessToken` in the `Authorization` header for logged-in users)*

**Headers:**
`Authorization: Bearer <accessToken>`

```json
{
  "oldPassword": "strongPassword123",
  "newPassword": "newStrongPassword123"
}
```
