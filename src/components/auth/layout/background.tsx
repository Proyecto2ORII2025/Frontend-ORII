export default function Background() {
    return (
        <div className="relative w-[70%] overflow-hidden bg-[url('/img/CLAUSTRO_SANTO_DOMINGO.jpg')] bg-cover hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-white from-[0%] to-transparent to-[10%]"></div>
        </div>
    );
}