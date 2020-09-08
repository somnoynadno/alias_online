import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {api} from '../http/API';
import {styles} from '../style/stylesheet';

class NewGameScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roundCount: '10',
            roundTimeSeconds: '60',
        };
    }

    handleCreateNewGame = async () => {
        await api.CreateGame(this.state.roundCount, this.state.roundTimeSeconds);
        this.props.navigation.replace('Game');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{margin: 40}}>
                    <View style={styles.flexbox}>
                        <Text>
                            Количествово раундов
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            keyboardType="numeric"
                            placeholder="Введите число раундов"
                            onChangeText={(text) => this.setState({roundCount: text})}
                            value={this.state.roundCount}
                        />
                        <Text>
                            Продолжительность раунда (сек)
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            keyboardType="numeric"
                            placeholder="Введите продолжительность раунда"
                            onChangeText={(text) => this.setState({roundTimeSeconds: text})}
                            value={this.state.roundTimeSeconds}
                        />
                        <View style={{height: '4%'}}/>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.handleCreateNewGame()}
                        >
                            <Text style={styles.buttonText}>Создать</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default NewGameScreen;
