import React from 'react'

type TitleProps = {
    mainTitle: string
    description: string
}
export const Title: React.FC<TitleProps> = ({mainTitle, description}) => {
    return (
        <div>
            <h2 className="text-3xl md:text-4xl font-bold">
                {mainTitle}
            </h2>
            <h3 className="text-xl text-muted-foreground pt-4">
                {description}
            </h3>
        </div>
    )
}

