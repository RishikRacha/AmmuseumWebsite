export const defaultsActionCreator = (data) => {
    return {
        type: 'DEFAULTGAMES',
        payload: data,
    }
}

export const gamesActionCreator = (data) => {
    return {
        type: 'GAMES',
        payload: data,
    }
}

export const lightGamesActionCreator = (data) => {
    return {
        type: 'LIGHT',
        payload: data,
    }
}

export const mediumGamesActionCreator = (data) => {
    return {
        type: 'MEDIUM',
        payload: data,
    }
}

export const heavyGamesActionCreator = (data) => {
    return {
        type: 'HEAVY',
        payload: data,
    }
}