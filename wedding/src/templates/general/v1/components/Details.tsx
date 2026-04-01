import DressCode from "./DressCode"
import Map from "./Map"
function Details() {
    return (
        <div className='h-[120vh] relative bg-gray-800 rounded-b-[250px] mb-12 flex flex-col px-5 pb-5'>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 text-red-500">
                Unazat
            </div>

            <div className="flex flex-col items-center mt-10 text-red-500">
                <h2>jhhffd</h2>
                <p>kfjdkfjfkjkdf</p>
            </div>

            <div className="h-[80%] bg-green-600 rounded-[190px] mt-auto flex flex-col justify-around items-center">
                <div>1</div>
                <div>
                    <div>2.1</div>
                    <div>2.2</div>
                    <div>2.3</div>
                </div>
                <div>
                    <Map />
                </div>
                <div>
                    <DressCode />
                </div>
            </div>
        </div>
    )
}

export default Details