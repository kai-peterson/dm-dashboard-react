import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MonsterList = () => {
    const [monsters, setMonsters] = useState([]);

    useEffect(() => {
        // axios.get('http://www.dnd5eapi.co/api/monsters')
        //     .then((response) => {
        //         response.data.results.forEach((monster) => {
        //             axios.get(`http://www.dnd5eapi.co/api/monsters/${monster.index}`)
        //                 .then((res) => {
        //                     let mon = res.data;
        //                     axios.post('http://localhost:8080/monsters', { name: mon.name, challenge_rating: mon.challenge_rating, url: mon.url })
        //                         .then((res) => {
        //                             console.log(res);
        //                         })
        //                         .catch((err) => {
        //                             console.log(err);
        //                         })
        //                 })
        //         })
        //     })
        //     .catch((error) => {
        //         console.log('Error getting monsters', error);
        //     })
        axios.get('http://localhost:8080/monsters')
            .then( (res) => {
                setMonsters(res.data);
            })
    }, [])

    const handleClick = (name) => {
        let newName = name.toLowerCase().replace(/ /g, '-');
        axios.get(`http://www.dnd5eapi.co/api/monsters/${newName}`)
            .then( (res) => {
                console.log(res);
                
            })
    }

    return (
        <ul>
            {monsters[0] && monsters.map( (monster) => 
                <li>
                    <div onClick={() => handleClick(monster.name)}>
                    {monster.name + `(${monster.challenge_rating})${monster.url}`}
                    </div>
                </li>
            )}
        </ul>
    )
}

export default MonsterList
