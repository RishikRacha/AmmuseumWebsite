const myReducer = (state = {defaultGames:[], games:[], lightGames:[], mediumGames: [], heavyGames: [], isLoggedIn: false, user: null}, action) => {

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

    else if(action.type === "LOGIN") {
        state = { ...state,
            isLoggedIn: true,
            user: action.payload,
        }
        console.log(state.user.username + " logged in.");
    }

    else if (action.type === "LOGOUT") {
        state = {...state,
            isLoggedIn: false,
            user: null,
        }
    }
    

    return state;
}

export default myReducer;