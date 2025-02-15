


export function Items({heading , placeholder , onChange}){

    return(<>
        <div className="flex flex-col justify-start px-2 pt-4">
            <div className="text-2xl font-semibold">{heading}</div>
            <input onChange={onChange} className="border-2" type="text" placeholder={placeholder} />
        </div>
    </>)


}