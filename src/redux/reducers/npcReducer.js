const npcReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_NPC':
            return {name: action.payload.name, level: action.payload.level, character_class: action.payload.character_class};
        default:
            return state;
    }
}

export default npcReducer;