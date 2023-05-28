import '@styles/globals.css'
import Navbar from '@components/Navbar'
import React from 'react'
import Provider from '@components/Provider'

export const metaData = {
    title: 'Promptopia',
    description: 'Discover and Share AI Promts'
}

function RootLayout({children}) {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient"></div>
                </div>

                <main className="app">
                    <Navbar/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout