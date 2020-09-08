import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {uuid4} from '../helpers';
import {api} from '../http/API';
import {styles} from '../style/stylesheet';

class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.uuid = uuid4();

        this.state = {
            username: '',
        };
    }

    handleRegistration = async () => {
        await api.CreateUser(this.state.username, this.uuid);
        // let data = await api.GetPlayerInfo();
        this.props.navigation.replace('Index');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{marginTop: '70%', alignItems: 'center'}}>
                    <Text style={styles.title}>Пожалуйста, представьтесь:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Ваш никнейнм"
                        onChangeText={(text) => this.setState({username: text})}
                        defaultValue={this.state.username}
                    />
                    <View style={{height: '6%'}}/>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.handleRegistration()}
                    >
                        <Text style={styles.buttonText}>Продолжить</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default RegisterScreen;
