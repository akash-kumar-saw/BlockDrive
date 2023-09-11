const listview = ({title, list, close}) => {
    return (
        <>
            <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
                <div className="flex flex-col justify-center bg-white p-4 rounded-lg shadow-lg shadow-black">
                    <div className="flex items-center justify-center gap-2 font-bold">
                        <h6>{title}</h6>
                    </div>
                    <br />
                    <div className="max-h-[300px] overflow-auto" >
                        <ul className="list-decimal px-8 font-Poppins sm:text-sm text-xs !leading-5">
                            {list.map((address, index) => (
                            <li key={index}>{address}</li>
                            ))}
                        </ul>
                        <br />
                    </div>
                    <div className="flex justify-end">
                        <button onClick={close} className="btn font-semibold rounded-br-xl border-2 border-black p-2 m-2">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default listview;