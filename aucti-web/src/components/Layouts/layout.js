import React from 'react'
import { Children } from 'react'
import Header from './header'
//make side bar a part of the content

const Layout = ({children}) => {
    return (<>
        <div className="sticky top-0 bg-white border-b-2 grid grid-cols-5 grid-rows-1 grid-flow-row grid-flow-col gap-1">
            <Header/>
        </div>
        <div className="grid grid-cols-5 grid-rows-1 grid-flow-row grid-flow-col gap-1 p-2">
            {children}
        </div>
       </>
    )
}

export default Layout