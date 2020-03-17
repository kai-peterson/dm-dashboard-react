import React, { useEffect } from 'react';
import axios from 'axios';

const DbDummy = () => {

    const monsters = 'http://www.dnd5eapi.co/api/monsters/';
    const spells = 'http://www.dnd5eapi.co/api/spells/';
    const classes = 'http://www.dnd5eapi.co/api/classes/';
    const subclasses = 'http://www.dnd5eapi.co/api/subclasses/';
    const features = 'http://www.dnd5eapi.co/api/features/';
    const magicSchools = 'http://www.dnd5eapi.co/api/magic-schools/';

    useEffect(() => {
        // axios.get(subclasses)
        //     .then((res) => {
        //         // const all = res.data.results;
        //         // const firstTen = all.slice(0, 29);
        //         const third = [res.data.results[7]];
        //         // console.log(all);
        //         // console.log(firstTen);
        //         console.log(third);

        //         // // for subclasses (needs adjusting)
        //         // third.forEach( (subclass) => {
        //         //     axios.get(subclasses + subclass.index)
        //         //     .then( (res) => {
        //         //         const one = res.data;
        //         //         console.log(one);
        //         //         let newSpellsIdk = [];
        //         //         one.spells.forEach( (spells) => {
        //         //             let spellObject = {prerequisiteUrls: [], spellName: ''};
        //         //             console.log(spells);
        //         //             spells.prerequisites.forEach( (prereq) => spellObject.prerequisiteUrls.push(prereq.url));
        //         //             spellObject.spellName = spells.spell.name;
        //         //             newSpellsIdk.push(spellObject);
        //         //         })
        //         //         console.log(newSpellsIdk);

        //         //         // axios.post(`http://localhost:8080/subclasses`, {name: one.name, url: one.url, character_class_id: 3})
        //         //         //     .then( (res) => {
        //         //         //         console.log(res);
        //         //         //     })
        //         //         //     .catch( (err) => {
        //         //         //         console.log(err);
        //         //         //     })
        //         //     })
        //         // })


        //         // // monsters
        //         // firstTen.forEach( (monster) => {
        //         //     axios.get(monsters + monster.index)
        //         //         .then( (res) => {
        //         //             console.log(res.data);

        //         //         })
        //         // })

        //         // // for magic schools
        //         // all.forEach( (school) => {
        //         //     axios.get(magicSchools + school.index)
        //         //         .then( (res) => {
        //         //             let s = res.data
        //         //             axios.post('http://localhost:8080/api/magic-schools', {index: s.index, name: s.name, description: s.desc, url: s.url})
        //         //         })
        //         // })

        //         // // for spells
        //         // firstTen.forEach( (spell) => {
        //         //     axios.get(spells + spell.index)
        //         //         .then( (res) => {
        //         //             console.log(res.data);
        //         //         })
        //         // })

        //         // // for features (need to re-do once with varchar(2500) but don't wanna hit 500 endpoints again rn)
        //         // all.forEach((feat) => {
        //         //     axios.get(features + feat.index)
        //         //         .then((res) => {
        //         //             let f = res.data;
        //         //             axios.post('http://localhost:8080/features', {index: f.index, name: f.name, description: f.desc.join(' '), level: f.level, url: f.url, className: f.class.name.toLowerCase(), subclassName: f.subclass ? f.subclass.name : 'none'})
        //         //                 .then( (res) => {
        //         //                     console.log(res);

        //         //                 })
        //         //         })
        //         // })

        //         // // for classes (needs adjusting)
        //         // all.forEach((c) => {
        //         //     axios.get(classes + c.index)
        //         //         .then((res) => {
        //         //             const one = res.data;
        //         //             console.log(one);
        //         //             // axios.post(`http://localhost:8080/subclasses`, {name: one.name, url: one.url, character_class_id: 3})
        //         //             //     .then( (res) => {
        //         //             //         console.log(res);
        //         //             //     })
        //         //             //     .catch( (err) => {
        //         //             //         console.log(err);
        //         //             //     })
        //         //         })
        //         // })
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })


        // asyncPost();
        // axios.post()

    }, [])

    async function asyncPost() {
        const x = ['Arctic', 'Coast', 'Desert', 'Forest', 'Grassland', 'Mountain', 'Swamp']
        for (let i = 0; i < 7; i++) {
            await axios.post(`http://localhost:8080/api/prerequisites/`, { name: `Circle of the Land: ${x[i]}`, url: `/api/features/circle-of-the-land-${x[i].toLowerCase()}`})
                .then((res) => {
                    console.log(res);
                })
        }
    }

    return (
        <div>

        </div>
    )
}

export default DbDummy
