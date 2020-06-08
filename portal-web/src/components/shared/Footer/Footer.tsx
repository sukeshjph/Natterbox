import React from "react"

export const Footer = () => (
  <footer className="footer">
    <p>Version:{process.env.REACT_APP_VERSION || ""}</p>
  </footer>
)
