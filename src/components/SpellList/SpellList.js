import React, { useEffect } from 'react';
import axios from 'axios';

const SpellList = () => {

    useEffect( () => {
        axios.get('http://www.dnd5eapi.co/api/spells')
            .then( (res) => {  
                let spell = res.data.results[4];
                console.log(spell);
                axios.get(`http://www.dnd5eapi.co/api/spells/${spell.index}`)
                    .then((res) => {
                        console.log(res.data);
                        let sp = res.data;
                        // axios.post('http://localhost:8080/spells', {name: sp.name, description: sp.desc[0], level: sp.level})
                    })
                // let spells = res.data.results;
                // console.log(spells);
                // spells.forEach( (spell) => {
                //     axios.get(`http://www.dnd5eapi.co/api/spells/${spell.index}`)
                //         .then( (res) => {
                //             let sp = res.data;
                //             axios.post('http://localhost:8080/spells', {name: sp.name, description: sp.desc[0], level: sp.leve})
                //                 .then( (res) => {
                //                     console.log(res);
                //                 })
                //                 .catch( (err) => {
                //                     console.log(err);
                //                 })
                //         })
                //         .catch( (err) => {
                //             console.log(err);
                //         })
                // })
            })
            .catch( (err) => {
                console.log(err);
            })
        // axios.get('http://localhost:8080/spells')
        //     .then( (res) => {
        //         console.log(res);
                
        //     })
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default SpellList
