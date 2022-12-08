import React from "react";
import { useState, useEffect } from "react";
import { db } from '../../firebase';
import { collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import './table.css'

const Table = () => {
    const [rooms, setRooms] = useState([]);
    const roomsCollection = collection(db, "temperatures");

    const orderedRooms = [...rooms].sort((a,b) => {
        if (a.no > b.no) {
            return 1;
          }
          if (a.no < b.no) {
            return -1;
          }
          return 0;
        })

    useEffect(() => {
        const getRooms = async () => {
            const data = await getDocs(roomsCollection);
            setRooms(data.docs.map(product => ({ ...product.data(), id: product.id })))

        }

        getRooms();
        console.log(orderedRooms);
    }, [])

    const updateRoom = async (num, id) => {
        if (num > 10 && num < 30) {
            const roomDoc = doc(db, "temperatures", id);
            await updateDoc(roomDoc, { timestamp: serverTimestamp(), temperature: Number(num) });
        }
    }

    return (
        <table className="table table-hover table-bordered align-middle text-center" id="teszt">
            <thead>
                <tr>
                    <th>Helység</th>
                    <th>Hőfok</th>
                    <th>Utolsó mentés időpontja</th>
                </tr>
            </thead>
            <tbody>
                {orderedRooms.map((oneRoom) => {
                    return (
                        <tr className="m-0 p-0">
                            <td className="bg-warning">
                                {oneRoom.name}
                            </td>
                            <td className="bg-success">
                                <input className="m-0 p-0" type="number" name="temperature" placeholder={oneRoom.temperature} key={oneRoom.id} id={oneRoom.id} onBlur={(e) => updateRoom(e.target.value, e.target.id)} />
                            </td>
                            <td className="bg-success">
                                {new Date(oneRoom.timestamp.seconds * 1000).toLocaleDateString(
                                    "hu-HU",
                                    {
                                        month: "numeric",
                                        day: "2-digit",
                                        year: "numeric",
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table