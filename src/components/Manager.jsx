import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])


    const getPassword = async () => {
        let reqVar = await fetch("http://localhost:3000/");
        let password = await reqVar.json()
        console.log(password);
        setPasswordArray(password)

    }

    useEffect(() => {
        getPassword()
    }, [])

    const copyText = (text) => {
        toast('Text is copied', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });

        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        if (ref.current.src.includes("icons/eye.png")) {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }
        else {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.password.length > 3 && form.username.length > 3) {

            if (form.id) {
                let resVar1 = await fetch("http://localhost:3000/", { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: form.id }) })
            }

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            let resVar = await fetch("http://localhost:3000/", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
            setform({ site: "", username: "", password: "" })
            toast('Saved Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }
        else {
            toast("Error: Not Saved..!!")
        }

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const deletePassword = async (id) => {
        let c = confirm("want to delete????")
        if (c) {
            setPasswordArray(passwordArray.filter((item) => item.id !== id))

            let resVar = await fetch("http://localhost:3000/", { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })

            // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
            toast('Deleted Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }

    }
    const editPassword = async (id) => {

        setform({ ...passwordArray.filter((item) => item.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter((item) => item.id !== id))

        // let resVar = await fetch("http://localhost:3000/", { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify( {id}) })   
        // console.log(resVar);

        // let reqVar1= await fetch("http://localhost:3000/")
        // let formData= await reqVar1.json()
        // let formNew= formData.filter((item) => item.id !== id)[0]
        // setform(formNew)



        // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)));

    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className=" p-3 md:mycontainer min-h-[85.6vh] ">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'> &lt;</span> <span>Pass</span>
                    <span className='text-green-500'>OP/&gt; </span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className="flex flex-col p-4 gap-8 text-black items-center">
                    <input onChange={handleChange} value={form.site} placeholder='Enter Website URL' className='rounded-full border border-green-500 py-1 p-4 w-full' type="text" name='site' id='st' />
                    <div className="flex md:flex-row flex-col w-full justify-between gap-8">
                        <input onChange={handleChange} value={form.username} placeholder='Enter Username' className='rounded-full w-full  border border-green-500 py-1 p-4' type="text" name='username' id='un' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full w-full border border-green-500 py-1 p-4' type="password" name='password' id='pw' />
                            <span onClick={showPassword} className='absolute right-[3px] top-[4px]'  >
                                <img ref={ref} className='p-1' src="icons/eye.png" width={26} alt="" />
                            </span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center w-fit rounded-full px-8 py-2 bg-green-400 hover:bg-green-300 border-green-800 border'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon> Save</button>

                </div>
                <div className="password">
                    <h2 className='font-bold text-2xl py-4'>Your Password</h2>
                    {passwordArray.length === 0 && <div>No Password to Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full mb-10 rounded-md">
                        <thead className='bg-green-800 rounded text-white'>
                            <tr>
                                <th className='py-2'>Website</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' py-2 border border-white text-center '>
                                        <div className="flex items-center justify-center">
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div onClick={() => { copyText(item.site) }} className=' size-7 cursor-pointer'>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className="flex items-center justify-center">
                                            <span>{item.username}</span>
                                            <div onClick={() => { copyText(item.username) }} className=' size-7 cursor-pointer'>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className="flex items-center justify-center">
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div onClick={() => { copyText(item.password) }} className=' size-7 cursor-pointer'>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>

        </>
    )
}

export default Manager