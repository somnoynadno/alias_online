import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {api} from '../http/API';
import {sortByKey} from '../helpers';
import {styles} from '../style/stylesheet';

class ResultsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            players: null,
        };
    }

    componentDidMount = async () => {
        let game = await api.GetGameInfo();
        let players = [];
        for (let token of game['PlayersTokens']) {
            let player = await api.GetPlayerInfoByToken(token);
            players.push(player);
        }
        players = sortByKey(players, 'Score');
        this.setState({players: players});
    };

    handleFinish = async () => {
        this.props.navigation.replace('Register');
    };

    render() {
        if (this.state.players !== null) {
            return (
                <View style={styles.container}>
                    <View style={styles.flexbox}>
                        <Text style={styles.title}>Результаты:</Text>
                        <View style={{width: '100%'}}>
                            {this.state.players.map((p, i) => {
                                return <Text style={styles.title}
                                             key={i}>{(i + 1) + '. ' + p['Name']} ({p['Score']})</Text>;
                            })
                            }
                            <View style={{height: '8%'}}/>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.handleFinish()}
                            >
                                <Text style={styles.buttonText}>Завершить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        } else {
            return <View/>;
        }
    }
}

export default ResultsScreen;
