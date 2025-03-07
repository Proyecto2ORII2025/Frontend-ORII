export default function Chart({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="border border-gray-100 bg-white rounded-2xl h-96 shadow hover:shadow-xl">
            <div className="flex justify-center mt-5 font-bold text-blue">
                <h2>{title}</h2>
            </div>
            <div className="mt-5 h-full">
                {children}
            </div>
        </div>
    );
}