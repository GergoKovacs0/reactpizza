import React, { useEffect, useState } from 'react';

const Kosar: React.FC = () => {
    const [kosar, setKosar] = useState([]);

    useEffect(() => {
        const kosar = localStorage.getItem('kosar');
        if (kosar) {
            setKosar(JSON.parse(kosar));
        }
    }, []);

    return (
        <div>
            <h1>Kosár</h1>
            <table>
                <thead>
                    <tr>
                        <th>Név</th>
                        <th>Mennyiség</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    );
};

export default Kosar;
