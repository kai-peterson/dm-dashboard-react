import React from 'react';

const NpcBonusDisplay = (props) => {

    const { bonuses, stats, findBonus } = props;

    // renders entire div for each bonus, including name and value of skill bonus
    const renderBonusDiv = (skill, stat) => {
        return (
            <div>
                <h2>{skill}</h2>
                {stat ? renderBonus(bonuses[skill], stat) : renderBonus(bonuses[skill])}
            </div>
        )
    }

    // renders correct bonus for each stat and skill based on stats, bonuses, proficiencies, and expertise
    // statType argument only exists for skills; all main stats will hit the final else in the outermost set of conditionals
    const renderBonus = (bonus, statType) => {

        // if bonus doesn't exist for skill yet, but statType does (aka it's a skill not a stat)...
        // then calc bonus based soley of bonus for that stat
        if (bonus === undefined && statType && stats[statType]) {
            let totalBonus = findBonus(stats[statType]);
            return renderH2ForBonus(totalBonus);
        } // if bonus for the skill already exists, take that into account and add onto bonus from stat
          else if (statType && stats[statType]) {
            if (stats[statType]) {
                let totalBonus = Number(bonus) + findBonus(stats[statType]);
                if (bonus !== undefined) {
                    return renderH2ForBonus(totalBonus);
                } else {
                    return <h2>{''}</h2>;
                }
            }
        } // otherwise calculate just using the existing bonus in state
          else {
            if (bonus !== undefined) {
                return renderH2ForBonus(Number(bonus));
            } else {
                return <h2>{''}</h2>;
            }
        }
    }

    // abstracted out repeated logic from renderBonus function
    // logic to render a + in front of positive numbers and a - in front of negative
    const renderH2ForBonus = (bonus) => {
        if (bonus >= 0) {
            return <h2>{`+ ${bonus}`}</h2>
        } else {
            return <h2>{`- ${String(bonus).slice(1)}`}</h2>
        }
    }

    return (
        <div className="npc-stats-form-container__skills-column">
                    <h1>Saving Throws</h1>
                    {renderBonusDiv('Strength')}
                    {renderBonusDiv('Dexterity')}
                    {renderBonusDiv('Constitution')}
                    {renderBonusDiv('Intelligence')}
                    {renderBonusDiv('Wisdom')}
                    {renderBonusDiv('Charisma')}
                    <h1>Skills</h1>
                    {renderBonusDiv('Acrobatics', 'Dexterity')}
                    {renderBonusDiv('Animal Handling', 'Wisdom')}
                    {renderBonusDiv('Arcana', 'Intelligence')}
                    {renderBonusDiv('Athletics', 'Strength')}
                    {renderBonusDiv('Deception', 'Charisma')}
                    {renderBonusDiv('History', 'Intelligence')}
                    {renderBonusDiv('Insight', 'Wisdom')}
                    {renderBonusDiv('Intimidation', 'Charisma')}
                    {renderBonusDiv('Investigation', 'Intelligence')}
                    {renderBonusDiv('Medicine', 'Wisdom')}
                    {renderBonusDiv('Nature', 'Intelligence')}
                    {renderBonusDiv('Perception', 'Wisdom')}
                    {renderBonusDiv('Performance', 'Charisma')}
                    {renderBonusDiv('Persuasion', 'Charisma')}
                    {renderBonusDiv('Religion', 'Intelligence')}
                    {renderBonusDiv('Sleight of Hand', 'Dexterity')}
                    {renderBonusDiv('Stealth', 'Dexterity')}
                    {renderBonusDiv('Survival', 'Wisdom')}
                    {renderBonusDiv('Acrobatics', 'Dexterity')}
                </div>
    )
}

export default NpcBonusDisplay
