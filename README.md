# Verifiable Credentials Login Demo (OpenID4VC + walt.id)

This is a **highly simplified demo project** created to explore a sign-up and login flow using [OpenID for Verifiable Credentials (OpenID4VC)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-ID1.html) and the [walt.id](https://walt.id) SSI Wallet.

The goal is to provide a minimal reference implementation that demonstrates how Verifiable Credentials (VCs) can be used for authentication in a web application. While it’s not secure or production-ready, it can help others learn by example.

---

## 🧪 Try the Demo

1. **Issue a sample credential** at:
   👉 [https://waltid-qr-demo.vercel.app/issue](https://waltid-qr-demo.vercel.app/issue)

2. **Use that credential to log in** via QR code:
   👉 [https://waltid-qr-demo.vercel.app](https://waltid-qr-demo.vercel.app)

---

## ⚠️ Disclaimer & Insecurity Notice

This project is for **testing and exploration only**. It is intentionally insecure and omits many best practices, including but not limited to:

* Blindly trusting the walt.id demo verifier.
* Using **hardcoded opaque tokens** for credential issuance.
* Omitting transaction code validation for pre-authorized credential issuance.
* No anti-replay protection (e.g., **no nonces** when polling the VP state).
* Hardcoded attributes like:

  * The `did:web` issuer.
  * Callback URLs.
  * Verifier endpoints.

You have been warned.

---

## 🔧 Implementation Notes

This project is aligned with **[Draft 13](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-ID1.html)** of the OpenID4VC specification for Verifiable Credential Issuance.

Built with [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com/), it uses **Redis** for temporary storage of authentication state.

---

## 🔐 Environment Variables

Before running the app, set up the following environment variables:

| Name                             | Description                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `REDIS_URL`                      | URL for your Redis instance (including `user:pass@host:port`)                                            |
| `WALTID_STATUS_CALLBACK_API_KEY` | Secret token used by the verifier to call back your `/api` route. Ideally should be rotated and secured. |
| `PRIV_JWK`                       | The private JWK matching the public key in your `.well-known/did.json` for signing operations.           |

---

## 🚀 Running the Project

Install dependencies and run the development server:

```bash
npm run dev     # or
yarn dev        # or
pnpm dev        # or
bun dev
```

---

## 🙋 Why Make This Public?

I made this public so that others can explore a working example of login with Verifiable Credentials. I'm also interested in gathering feedback or insights from the community. **This is not a full-featured or production-grade reference implementation**, but feel free to fork, learn, or contribute.

Pull Requests are welcome, though note that this project is on **very low maintenance**.
