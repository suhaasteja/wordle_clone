import React from 'react';

type RowProps = {
    rowContent: string[];
    bgColors: string[];
}

export const Row = (props: RowProps) => {
    const {rowContent, bgColors} = props;
    
    return (
        <>
            {
                rowContent.map((box, i) => {
                    return (
                        <div className={`box ${bgColors[i] || ''}`}  key={i}>
                            {box && box}
                        </div>
                    )
                })
            }
        </>
        
    )
}
