import { useEffect, useState } from 'react';
import { Row } from './Row';

type GridProps = {
    gridContent: string[][];
    bgColors: string[][]
}

export const Grid = (props: GridProps): React.ReactElement => {

    const {gridContent, bgColors} = props;


    return (
        <div className='boxes'>
            {
                gridContent.map((row, i) => {
                    return (
                        <Row rowContent={row} key={i} bgColors={bgColors[i] || []} />
                    )
                })
            }
        </div>
    )
}
