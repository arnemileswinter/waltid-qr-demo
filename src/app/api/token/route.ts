import { NextRequest } from "next/server"

export async function POST(r: NextRequest) {
    console.log('POST TOKEN')
    console.log('request', r)
    const body = await r.formData()
    console.log(body)
    if (body.get('grant_type') === 'urn:ietf:params:oauth:grant-type:pre-authorized_code' && body.get('pre-authorized_code') === 'lolskipmelmfao') {
        return new Response(JSON.stringify({
            "access_token": "ayylmaotoken", // TODO: this should be a different token obv
            "token_type": "Bearer",
            "expires_in": 86400,
            "authorization_details": [
                {
                    "type": "openid_credential",
                    "credential_configuration_id": "MyConfigurationId",
                    "credential_identifiers": ["MyCredential_jwt_vc_json"]
                }
            ]
        }), { headers: { 'content-type': 'application/json' } })
    }
    return new Response('', { status: 400 })
}