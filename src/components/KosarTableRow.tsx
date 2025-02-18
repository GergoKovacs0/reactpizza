import React from 'react';
import Pizza from '../types/Pizza';
import { Button, Row } from 'react-bootstrap';

interface KosarTableRowProps {
    pizza: Pizza;
    pcs: number;
}

const KosarTableRow: React.FC<KosarTableRowProps> = ({ pizza, pcs }) => {
    const changePcs = (increment: number) => {
        const kosar = localStorage.getItem('kosar');
        if (kosar) {
            const parsedKosar = JSON.parse(kosar);
            const updatedKosar = parsedKosar.map((item: any) => {
                if (item.pizza.id === pizza.id) {
                    return {
                        ...item,
                        pcs: item.pcs + increment,
                    };
                }
            });
            localStorage.setItem('kosar', JSON.stringify(updatedKosar));
        }
    };
    return (
        <tr>
            <td>{pizza.nev}</td>
            <td>
                <Row style={{ display: 'flex', justifyContent: 'center', msFlexDirection: 'row' }}>
                    <Button onClick={() => changePcs(-1)}>-</Button>
                    {pcs}
                    <Button onClick={() => changePcs(+1)}>+</Button>
                </Row>
            </td>
        </tr>
    );
};

export default KosarTableRow;
