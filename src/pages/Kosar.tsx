import React, { useEffect, useState } from 'react';
import KosarTableRow from '../components/KosarTableRow';
import Pizza from '../types/Pizza';
import { Row } from 'react-bootstrap';

const Kosar: React.FC = () => {
    const [kosar, setKosar] = useState([]);

    useEffect(() => {
        const kosar = localStorage.getItem('kosar');
        if (kosar) {
            setKosar(JSON.parse(kosar));
        }
        console.log(kosar);
    }, []);

    return (
        <div>
            <h1>Kosár</h1>
            <Row>
                <table>
                    <thead>
                        <tr>
                            <th>Név</th>
                            <th>Mennyiség</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kosar.map((item: any) => (
                            <KosarTableRow
                                key={item.id}
                                pizza={
                                    {
                                        id: item.id,
                                        nev: item.nev,
                                        leiras: item.leiras,
                                        ar: item.ar,
                                        imageUrl: item.imageUrl,
                                    } as Pizza
                                }
                                pcs={item.quantity}
                            />
                        ))}
                    </tbody>
                </table>
            </Row>
        </div>
    );
};

export default Kosar;
