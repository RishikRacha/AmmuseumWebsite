const myReducer = (state = {defaultGames:[], games:[], lightGames:[], mediumGames: [], heavyGames: []}, action) => {

    if(action.type === "DEFAULTGAMES") {
        state = {...state,
            defaultGames: action.payload,
        }
    }
    
    else if(action.type === "GAMES") {
        state = { ...state,
            games: action.payload,
        }
    }

    else if(action.type === "LIGHT") {
        state = { ...state,
            lightGames: action.payload,
        }
    }

    else if(action.type === "MEDIUM") {
        state = { ...state,
            mediumGames: action.payload,
        }
    }

    else if(action.type === "HEAVY") {
        state = { ...state,
            heavyGames: action.payload,
        }
    }

    

    return state;
}

export default myReducer;