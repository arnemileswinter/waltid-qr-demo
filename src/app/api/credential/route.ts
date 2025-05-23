import { importJWK } from 'jose'
import { createVerifiableCredentialJwt, JwtCredentialPayload } from 'did-jwt-vc'
import { decodeJWT } from 'did-jwt'
// import { Resolver } from 'did-resolver'
// import * as keyDidResolver from 'key-did-resolver'

import { NextRequest } from 'next/server';

// const resolver = new Resolver(keyDidResolver.getResolver())

const issue = (payload: JwtCredentialPayload) => createVerifiableCredentialJwt(payload, {
    did: 'did:web:waltid-qr-demo.vercel.app',
    signer: async (data) => {
        const key = await importJWK(JSON.parse(process.env.PRIV_JWK!), 'ES256') as CryptoKey;
        const sig = await crypto.subtle.sign(
            { name: 'ECDSA', hash: 'SHA-256' },
            key,
            typeof data !== 'string' ? data : new TextEncoder().encode(data)
        );
        return Buffer.from(sig).toString('base64url');
    },
    alg: 'ES256'
}, { header: { 'kid': 'did:web:waltid-qr-demo.vercel.app#key-1' } })

export async function POST(r: NextRequest) {
    console.log('request: ', r)
    const jsonBodyPayload = await r.json()
    console.log('body: ', jsonBodyPayload)
    if (jsonBodyPayload['proof'] && jsonBodyPayload['proof']['proof_type'] === 'jwt') {
        const decodedHeader = decodeJWT(jsonBodyPayload.proof.jwt).header  // TODO: verify!! https://github.com/decentralized-identity/did-jwt/issues/323
        const subjectId = decodedHeader.kid || '';
        console.log('subjectId: ', { subjectId })

        const credential = await issue({
            iat: Date.now(),
            sub: subjectId,
            vc: {
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiableCredential', 'MyCredential'],
                issuer: {
                    id: "did:web:waltid-qr-demo.vercel.app",
                    name: "qr demo app"
                },
                credentialSubject: {
                    id: subjectId,
                    somenumber: Math.round(Math.random() * 10)
                },
                issuanceDate: new Date().toISOString()
            }
        })
        console.log(credential)
        return new Response(JSON.stringify({ credential }), { headers: { 'content-type': 'application/json' } })

    }
    return new Response('no proof')
}