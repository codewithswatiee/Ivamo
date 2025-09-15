export const Header = () => {
    return (
        <header className="bg-white flex justify-between text-black py-4 px-4">
            <a href="/" className="pl-3 font-[900] font-laLuxes text-lg cursor-pointer">
                Ivamo
            </a>
            <div className="flex gap-7 font-[400] font-sans items-center pr-6">
                <a className="hover:text-gray-600" href="#">Work</a>
                <a className="hover:text-gray-600" href="#">About</a>
                <a className="hover:text-gray-600" href="#">Contact</a>

            </div>
        </header>
    )
}