import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {api} from '../http/API';
import {styles} from '../style/stylesheet';
import {preprocessWord} from '../helpers';

const SLEEP_TIME = 5000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class GameScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameInfo: {},
            gameIsStarted: false,
            roundIsReady: false,
            roundIsGoing: false,
            currentWord: null,
        };
    }

    componentDidMount = async () => {
        await this.fetchGameInfo();
        setTimeout(this.waitForGameStarted, 0); // new thread
    };

    waitForGameStarted = async () => {
        while (!this.state.gameIsStarted) {
            await this.fetchGameInfo();
            await sleep(SLEEP_TIME);
        }
    };

    fetchGameInfo = async () => {
        console.log('fetching info...');
        let game = await api.GetGameInfo();
        this.setState({gameInfo: game});

        if (game['Status'] === 1) {
            this.setState({gameIsStarted: true});

            let c = game['CurrentRoundNumber'];
            if (c !== 0) {
                let round = await this.fetchLastRoundInfo(game['RoundsUUIDs'][c - 1]);
                if (round['PlayerToken'] === api.token) {
                    // it's our turn to play!
                    api.roundUUID = round['UUID'];
                    this.notifyRoundIsReady();
                } else {
                    // wait a little for next round to end...
                    await sleep(SLEEP_TIME);
                    if (!round['IsFinished']) {
                        await this.waitForPreviousRoundFinish(game['RoundsUUIDs'][c - 1]);
                    }
                    // check who is next...
                    await this.fetchGameInfo();
                }
            } else {
                // round not yet started...
                await sleep(SLEEP_TIME);
                await this.fetchGameInfo();
            }
        }
        if (game['Status'] === 2) {
            await this.handleFinishGame();
        }
    };

    waitForPreviousRoundFinish = async (roundUUID) => {
        let exit = false;
        while (!exit) {
            await sleep(SLEEP_TIME);
            let round = await this.fetchLastRoundInfo(roundUUID);
            if (round['IsFinished']) {
                exit = true;
            }
        }
    };

    notifyRoundIsReady = () => {
        this.setState({roundIsReady: true});
    };

    fetchLastRoundInfo = async (roundUUID) => {
        return await api.GetRoundInfo(roundUUID);
    };

    handleStartRound = async () => {
        await this.getNewWord();
        this.setState({roundIsReady: false, roundIsGoing: true});

        let rn = this.state.gameInfo['CurrentRoundNumber'];
        setTimeout(this.finishRound.bind(this, rn), this.state.gameInfo['RoundTimeSeconds'] * 1000);
    };

    finishRound = async (roundNumber) => {
        if (this.state.roundIsGoing && (roundNumber === this.state.gameInfo['CurrentRoundNumber'] || roundNumber === undefined)) {
            this.setState({roundIsGoing: false, currentWord: null});
            await api.FinishRound();    // finish current round
            await api.StartRound();     // init round for next player
            await this.fetchGameInfo(); // go down recursively once more
        }
    };

    handleGuessWord = async () => {
        await api.GuessCurrentWord();
        await this.getNewWord();
    };

    handleSkipWord = async () => {
        await api.SkipCurrentWord();
        await this.getNewWord();
    };

    getNewWord = async () => {
        let word = await api.GetCurrentWord();
        if (word === this.state.currentWord) {
            // pull is empty
            await this.finishRound();
        } else {
            this.setState({currentWord: word});
        }
    };

    handleStartGame = async () => {
        await api.StartGame();
        this.setState({gameIsStarted: true});
        // necessary to start first round
        await api.StartRound();
        await this.fetchGameInfo();
    };

    handleFinishGame = async () => {
        await api.FinishGame();
        console.log('game finished');
        this.props.navigation.replace('Results');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flexbox}>
                    <View style={{alignItems: 'center'}}>
                        <Text>UUID для подключения: </Text>
                        <Text style={{marginBottom: 10}} selectable={true}>{this.state.gameInfo['UUID']}</Text>
                        {api.isCreator === true ?
                            this.state.gameIsStarted ?
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.handleFinishGame()}
                                >
                                    <Text>Закончить игру</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.handleStartGame()}
                                >
                                    <Text>Начать игру</Text>
                                </TouchableOpacity>
                            :
                            <View/>
                        }
                    </View>
                    <View style={{height: '10%'}}/>
                    <ImageBackground source={require('../assets/back.png')} style={styles.backgroundImage}>
                        {this.state.currentWord !== null ?
                            <Text style={styles.innerText}>
                                {preprocessWord(this.state.currentWord)}
                            </Text>
                            : <View/>
                        }
                    </ImageBackground>
                    <View style={{height: '10%'}}/>
                    {this.state.roundIsReady ?
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.handleStartRound()}
                        >
                            <Text style={styles.buttonText}>Начать раунд</Text>
                        </TouchableOpacity>
                        : <View/>
                    }
                    {this.state.roundIsGoing ?
                        <View style={{height: 100}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                <TouchableOpacity
                                    style={styles.guessButton}
                                    onPress={() => this.handleGuessWord()}
                                />
                                <TouchableOpacity
                                    style={styles.skipButton}
                                    onPress={() => this.handleSkipWord()}
                                />
                            </View>
                        </View>
                        : <View style={{height: 100}}/>
                    }
                </View>
            </View>
        );
    }
}

export default GameScreen;
