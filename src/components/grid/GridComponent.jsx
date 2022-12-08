import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { db } from "../../firebase";
import { collection, getDocs } from 'firebase/firestore';
import './GridComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

const GridComponent = () => {

    const [rooms, setRooms] = useState([]);
    const roomsCollection = collection(db, "temperatures");

    useEffect(() => {
        const getRooms = async () => {
            const data = await getDocs(roomsCollection);
            setRooms(data.docs.map(product => ({ ...product.data(), id: product.id })))
        }

        getRooms();
    }, [])

    let date = new Date().toLocaleDateString("hu-HU");

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
            field: 'name',
            headerName: 'Helyiség',
            width: 200,
            editable: false,
        },
        {
            field: 'temperature',
            headerName: 'hőfok',
            type: 'number',
            width: 100,
            editable: false,
        }
    ];

    const rows = rooms

    return (
        <>
            <h2 className='text-center bg-secondary py-3'>Hőfokok termenként</h2>
            <span>{date}</span>
            <div>
                <a href="javascript:window.print()">
                    <a href="javascript:window.print();"><FontAwesomeIcon icon={faPrint} className="print text-success" /></a>
                </a>
            </div>
            <Box sx={{ height: 1950, width: '320px' }} className='mx-auto' id="boxToPrint">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={100}
                    rowsPerPageOptions={[100]}

                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    columnVisibilityModel={{
                        status: false,
                        id: false,
                    }}
                />
            </Box>
        </>
    );
}

export default GridComponent