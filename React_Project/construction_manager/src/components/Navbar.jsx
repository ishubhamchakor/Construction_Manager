import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
                <div class=" d-flex">
                    <div>
                        <Link class="navbar-brand" href="#">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2YA3IL00IQgFsSwMXCidNfUMlz6XA0QnaPw&s" alt="" width="70" height="70" class="d-inline-block align-text-top" style={{ mixBlendMode: "multiply" }} />
                        </Link>
                    </div>
                    <div>
                        <h3 className='mt-3'>Construction Manager</h3>
                    </div>
                </div>

            </nav>
        </>
    )
}
