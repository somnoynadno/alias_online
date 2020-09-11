class API {
    BASE_URL = 'http://alias.somnoynadno.ru';
    DEBUG = true;
    token = null;
    gameUUID = null;
    roundUUID = null;
    isCreator = false;

    CreateUser = async (username, token) => {
        this.token = token;

        let response = await fetch(`${this.BASE_URL}/player/create?userName=${username}&userToken=${this.token}`);
        if (response.ok) {
            let data = await response.text();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    GetPlayerInfo = async () => {
        let response = await fetch(`${this.BASE_URL}/player/getInfo?userToken=${this.token}`);
        if (response.ok) {
            let data = await response.json();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    GetPlayerInfoByToken = async (token) => {
        let response = await fetch(`${this.BASE_URL}/player/getInfo?userToken=${token}`);
        if (response.ok) {
            let data = await response.json();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    UpdateScore = async (delta) => {
        let response = await fetch(`${this.BASE_URL}/player/updateScore?delta=${delta}&userToken=${this.token}`);
        if (response.ok) {
            let data = await response.text();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    GetAllPlayers = async () => {
        let response = await fetch(`${this.BASE_URL}/player/getAll`);
        if (response.ok) {
            let data = await response.json();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    CreateGame = async (roundCount, roundTimeSeconds) => {
        let response = await fetch(`${this.BASE_URL}/game/create?userToken=${this.token}&roundCount=${roundCount}&roundTimeSeconds=${roundTimeSeconds}`);
        if (response.ok) {
            let data = await response.json();
            if (this.DEBUG) {
                console.log(data);
            }
            this.gameUUID = data['gameUUID'];
            this.isCreator = true;
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    GetGameInfo = async () => {
        let response = await fetch(`${this.BASE_URL}/game/getInfo?gameUUID=${this.gameUUID}`);
        if (response.ok) {
            let data = await response.json();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    JoinGame = async (gameUUID) => {
        this.gameUUID = gameUUID;

        let response = await fetch(`${this.BASE_URL}/game/join?userToken=${this.token}&gameUUID=${this.gameUUID}`);
        if (response.ok) {
            let data = await response.text();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    StartGame = async () => {
        let response = await fetch(`${this.BASE_URL}/game/start?gameUUID=${this.gameUUID}`);
        if (response.ok) {
            let data = await response.text();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    StartRound = async () => {
        let response = await fetch(`${this.BASE_URL}/game/startRound?gameUUID=${this.gameUUID}`);
        if (response.ok) {
            let data = await response.json();
            if (this.DEBUG) {
                console.log(data);
            }
            this.roundUUID = data['RoundUUID'];
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    GetCurrentRoundInfo = async () => {
        let response = await fetch(`${this.BASE_URL}/round/getInfo?UUID=${this.roundUUID}`);
        if (response.ok) {
            let data = await response.json();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    GetRoundInfo = async (roundUUID) => {
        let response = await fetch(`${this.BASE_URL}/round/getInfo?UUID=${roundUUID}`);
        if (response.ok) {
            let data = await response.json();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    GetCurrentWord = async () => {
        let response = await fetch(`${this.BASE_URL}/round/getCurrentWord?UUID=${this.roundUUID}`);
        if (response.ok) {
            let data = await response.text();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    GuessCurrentWord = async () => {
        let response = await fetch(`${this.BASE_URL}/round/guessCurrentWord?UUID=${this.roundUUID}`);
        if (response.ok) {
            let data = await response.text();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    SkipCurrentWord = async () => {
        let response = await fetch(`${this.BASE_URL}/round/skipCurrentWord?UUID=${this.roundUUID}`);
        if (response.ok) {
            let data = await response.text();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    };

    FinishRound = async () => {
        let response = await fetch(`${this.BASE_URL}/game/finishRound?gameUUID=${this.gameUUID}`);
        if (response.ok) {
            let data = await response.text();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log("HTTP-Error: " + response.status);
        }
    }

    FinishGame = async () => {
        let response = await fetch(`${this.BASE_URL}/game/finish?gameUUID=${this.gameUUID}`)
        if (response.ok) {
            let data = await response.text();
            if (this.DEBUG) {
                console.log(data);
            }
            return data;
        } else {
            console.log("HTTP-Error: " + response.status);
        }
    }
}

export const api = new API();
