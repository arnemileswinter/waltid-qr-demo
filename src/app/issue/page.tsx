import Qr from "@/components/qr"

export default function Issue(){
    const credential_offer_uri = encodeURIComponent('https://waltid-qr-demo.vercel.app/api/credential-offer')
    const url = `openid-credential-offer://?credential_offer_uri=${credential_offer_uri}`
    return <div className="flex flex-col items-center">
        <Qr data={url}></Qr>
        <code className="block max-w-2xl break-words">{url}</code>
    </div>
}