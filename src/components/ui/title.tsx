type TitleProps = {
    title: string
}

export default function Title(props: TitleProps) {
    return (
        <>
            <h1 className="text-xl md:text-3xl font-semibold text-blue">
                {props.title}
            </h1>
            <div className="border-b-2 md:border-b-4 border-redLight w-10 md:w-20" />
        </>
    )
}