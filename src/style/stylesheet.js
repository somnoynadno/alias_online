import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 28,
        backgroundColor: '#eaeaea',
        alignContent: 'center',
        alignItems: 'center',
    },
    title: {
        borderRadius: 6,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#2ECC71',
        opacity: 0.9,
        borderRadius: 12,
        alignItems: 'center',

        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,

        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3,

        elevation: 4,
    },
    guessButton: {
        borderRadius: 20,
        backgroundColor: '#2ECC71',
        width: '40%',
    },
    skipButton: {
        borderRadius: 20,
        backgroundColor: '#C93131',
        width: '40%',
    },
    buttonText: {
        fontSize: 28,
    },
    textInput: {
        fontSize: 26,
    },
    flexbox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    backgroundImage: {
        height: 140,
        alignItems: 'center',
    },
    innerText: {
        paddingTop: 45,
        margin: 'auto',
        fontSize: 30,
        textShadowColor: 'white',
        textShadowRadius: 6,
    },
});
