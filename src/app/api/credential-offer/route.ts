export async function GET() {
    return new Response(JSON.stringify({
        credential_issuer: 'https://waltid-qr-demo.vercel.app',
        credential_configuration_ids:[ 'MyCredential_jwt_vc_json' ],
        'grants':{
            'urn:ietf:params:oauth:grant-type:pre-authorized_code':{
                'pre-authorized_code':'lolskipmelmfao' // TODO: obvious bogus preauth'd code
            }
        }
    }), {headers:{'content-type':'application/json'}})
}