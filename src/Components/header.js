import React from 'react'
import { BellIcon, LogOutIcon, Menu } from "lucide-react";

export default function header() {
  return (
    <>
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "8px",width:'100%' }}>
            <div style={{
              width: "31px",
              height: "31px",
              backgroundColor: "#abbffc",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <BellIcon color="#241f63" size={15} />
            </div>

            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "2px solid #925fe2",
              overflow: "hidden"
            }}>
              <img src="/frame-19.svg" alt="Profile" style={{ width: "100%", height: "100%" }} />
            </div>

            <div>
              <div style={{ fontSize: "14px", fontWeight: 600 }}>Bhavin</div>
              <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)" }}>Admin</div>
            </div>
          </div>
    </>
  )
}
