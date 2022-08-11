import React from "react"
import { Header } from "./index"

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      {children}
    </>
  )
}

export default Layout
