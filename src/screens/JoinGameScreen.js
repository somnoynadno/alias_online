import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {api} from '../http/API';
import {styles} from '../style/stylesheet';

class JoinGameScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameUUID: '',
        };
    }

    handleJoinGame = async () => {
        await api.JoinGame(this.state.gameUUID);
        this.props.navigation.replace('Game');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flexbox}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Идентификатор игры"
                        onChangeText={(text) => this.setState({gameUUID: text})}
                        value={this.state.gameUUID}
                    />
                    <View style={{height: '4%'}}/>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.handleJoinGame()}
                    >
                        <Text style={styles.buttonText}>Поехали!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default JoinGameScreen;
