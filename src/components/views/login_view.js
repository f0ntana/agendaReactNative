import React, { Component } from 'react';
import {
    NativeModules,
    View,
    StyleSheet,
    Dimensions,
    Image,
    AsyncStorage,
    Text,
    ActivityIndicator
} from 'react-native';
import {
    FormLabel,
    FormInput,
    FormValidationMessage,
    Button,
    Card
} from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { API } from '../../utils/api';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const IMAGELOGORENDER = require('./../../images/soja.png');
const IMAGEPETROVINA = require('./../../images/petrovina.png');

export default class LoginHome extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);

        let token = AsyncStorage.getItem('_token').then(value => {
            if (value) {
                const { navigate } = this.props.navigation;
                navigate('Agenda');
            }
        });

        this.state = {
            email: '',
            password: '',
            isLoading: false
        };
    }

    doLogin() {
        this.setState({ isLoading: true });
        API.postLogin(this.state)
            .then(response => response.json())
            .then(async response => {
                if (response.data) {
                    try {
                        await AsyncStorage.setItem(
                            '_token',
                            response.data.token
                        );
                    } catch (error) {
                        alert('erro ao salvar token');
                    }
                    const { navigate } = this.props.navigation;
                    navigate('Agenda');
                } else {
                    alert('Dados inválidos');
                    this.setState({ isLoading: false });
                }
            });
    }

    render() {
        return (
            <KeyboardAwareScrollView ref="scroll">
                <Image source={IMAGELOGORENDER} style={styles.backgroundImage}>
                    <Card containerStyle={{ marginTop: 20, opacity: 0.8 }}>
                        <Image
                            source={IMAGEPETROVINA}
                            style={{ width: SCREEN_WIDTH * 0.8 }}
                            resizeMode="contain"
                        />
                        {this.state.isLoading && (
                            <ActivityIndicator
                                color="#338927"
                                size="large"
                                style={styles.activityIndicator}
                            />
                        )}
                        <FormLabel labelStyle={styles.textForm}>
                            Email
                        </FormLabel>
                        <FormInput
                            inputStyle={styles.textForm}
                            ref="forminput"
                            textInputRef="email"
                            onChangeText={val => {
                                this.setState({ email: val });
                            }}
                        />
                        <FormLabel labelStyle={styles.textForm}>
                            Senha
                        </FormLabel>
                        <FormInput
                            inputStyle={styles.textForm}
                            ref="forminput"
                            textInputRef="password"
                            secureTextEntry={true}
                            onChangeText={val => {
                                this.setState({ password: val });
                            }}
                        />
                        <Button
                            icon={{ name: 'user', type: 'font-awesome' }}
                            style={{ marginTop: 20 }}
                            title="Entrar"
                            onPress={() => this.doLogin()}
                        />
                        <Text style={styles.version}>Versão: 15</Text>
                    </Card>
                </Image>
            </KeyboardAwareScrollView>
        );
    }
}

let styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    textForm: {
        fontSize: 16
    },
    version: {
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 14
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    }
});
