import Qr from "@/components/qr";
import { randomBytes } from "crypto";
import { version } from "../../package.json";
import PollSSI from "@/components/poll-ssi";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const stateId = encodeURI(randomBytes(16).toString("base64"));
  // sent by backend to waltid verifier. Result is a string that we generate into a qr code for the user to scan with their wallet.
  const presentation = await fetch(
    "https://verifier.demo.walt.id/openid4vc/verify",
    {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        responseMode: "direct_post",
        stateId: stateId,
        successRedirectUri: "https://waltid-qr-demo.vercel.app/success?state=$id",
        successErrorUri: "https://waltid-qr-demo.vercel.app/error?state=$id",
        statusCallbackUri: "https://waltid-qr-demo.vercel.app/api",
        statusCallbackApiKey: `${process.env.WALTID_STATUS_CALLBACK_API_KEY}`,
      },
      body: JSON.stringify({
        request_credentials: [
          {
            format: "jwt_vc_json",
            type: "MyCredential",
          },
        ],
      }),
    }
  ).then((r) => r.text());

  return (
    <div className="flex flex-col items-center">
      <p>
        State-ID: <span style={{ fontWeight: "bold" }}>{stateId}</span>
      </p>
      <div className="flex flex-col items-center">
        <Qr data={presentation}></Qr>
        <code className="block max-w-2xl break-words">{presentation}</code>
      </div>
      <PollSSI state={stateId}></PollSSI>
      <footer>{version}</footer>
    </div>
  );
}
