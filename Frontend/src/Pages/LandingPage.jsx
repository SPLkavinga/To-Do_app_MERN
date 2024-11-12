import { Link } from "react-router-dom";

function LandingPage() {
    return (  
        <section className="flex items-center justify-center w-screen h-screen p-20 bg-slate-100">
            <div className="w-[700px] h-[500px] bg-white rounded-xl flex flex-col items-center justify-center space-y-8">
                <p className="text-5xl text-center text-black">Welcome To the Asipiya TO-DO-APP</p>
                <Link className="px-6 py-2 font-bold text-white bg-black rounded-lg border-b-slate-100" to="/add">
                    GET STARTED
                </Link>
            </div>
        </section>
    );
}

export default LandingPage;
