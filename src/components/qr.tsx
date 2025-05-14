"use client"
import * as QR from "qrcode";
import { useEffect, useRef } from "react"

export default function Qr({data}:{data:string}) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        if(canvasRef.current && data && data.length>0){
            QR.toCanvas(canvasRef.current,data,{errorCorrectionLevel:'low'})
        }
    }, [canvasRef,data])
    return (<canvas
            ref={canvasRef}
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              padding: "0.5rem",
            }}
          ></canvas>)
}

