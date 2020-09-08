import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../style/stylesheet';

class IndexScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{margin: 20}}
                    source={require('../assets/logo.png')}
                />
                <View style={styles.flexbox}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.replace('NewGame')}
                    >
                        <Text style={styles.buttonText}>Создать игру</Text>
                    </TouchableOpacity>
                    <View style={{height: '10%'}}/>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.replace('JoinGame')}
                    >
                        <Text style={styles.buttonText}>Присоединиться</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default IndexScreen;
