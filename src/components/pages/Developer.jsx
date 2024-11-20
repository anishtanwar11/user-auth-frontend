import DeveloperImg from "../../assets/farewalle3.jpg";

const Developer = () => {
    return (
        <div className="flex flex-col lg:flex-row  items-center lg:items-start justify-center gap-x-4 mt-24 mb-10 px-3 gap-y-4">
            <div className="bg-[#1E1E1E] p-4 rounded-2xl border-[1px] border-slate-700 w-full max-w-md">
                <div className="overflow-hidden rounded-lg flex items-center justify-center h-80">
                    <img src={DeveloperImg} alt="" />
                </div>
                <div className="mt-4 flex flex-col gap-y-2">
                    <h1 className="text-xl font-bold font-[neuemachina]">Hey 👋, I'm Anish Tanwar</h1>
                    <p className="text-sm text-gray-300 text-justify">I enjoy creating Web products. I'm a passionate MERN Stack and Next.js Developer with a dedication to building clean, efficient, and user-friendly web applications. I've hands-on experience from internships at Primewise Consulting and Solitaire Infosys. My expertise spans both frontend and backend development, allowing me to build comprehensive solutions from the ground up.</p>
                    <h1 className="bg-[#1a1a1a] border-[1px] border-slate-700 w-min px-4 py-1 text-sm rounded-md letter-spacing tracking-widest text-gray-200">
                        <i className="ri-map-pin-2-line mr-1"></i>INDIA
                    </h1>
                </div>
            </div>

            <div className="bg-[#1E1E1E] p-4 rounded-2xl border-[1px] border-slate-700 w-full max-w-md flex flex-wrap gap-4 lg:flex-col gap-y-4">
                <a href="https://anishtanwar.vercel.app/" target="_blank" className="bg-white w-min text-black px-3 py-1 text-base font-medium rounded">
                    <i className="ri-global-line mr-1"></i>Portfolio
                </a>
                <a href="https://www.linkedin.com/in/thisisanishtanwar/" target="_blank" className="bg-blue-600 w-max px-3 py-1 text-base font-medium rounded">
                    <i className="ri-linkedin-box-line mr-1"></i>LinkedIn
                </a>
                <a href="https://github.com/anishtanwar11" target="_blank" className="bg-gray-600 w-max px-3 py-1 text-base font-medium rounded">
                    <i className="ri-github-fill mr-1"></i>Github
                </a>
                <a href="https://www.instagram.com/thisisanishtanwar/" target="_blank" className="bg-pink-600 w-max px-3 py-1 text-base font-medium rounded">
                    <i className="ri-instagram-line mr-1"></i>Instagram
                </a>
                <a href="https://github.com/anishtanwar11/Notebook" target="_blank" className="bg-black w-max px-3 py-1 text-base font-medium rounded">
                    <i className="ri-github-fill mr-1"></i>Project Source Code
                </a>
            </div>
        </div>
    )
}

export default Developer
