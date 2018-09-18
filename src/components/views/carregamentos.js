import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    Linking
} from 'react-native';
import { Text, Card } from 'react-native-elements';
import { API } from '../../utils/api';

export default class Carregamento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            items: []
        };
    }

    componentDidMount = async () => {
        await API.getCarregamentos()
            .then(response => response.json())
            .then(items => {
                this.setState({ items, isLoading: false });
            });
    };

    _keyExtractor = (item, index) => index;

    _renderItem = ({ item }) => (
        <Card>
            <View style={styles.textinfo}>
                <Text style={styles.textbold}>N. Programação: </Text>
                <Text>{item.numeroprogorigem}</Text>
            </View>
            <View style={styles.textinfo}>
                <Text style={styles.textbold}>RTC: </Text>
                <Text>{item.nomerepresentante}</Text>
            </View>
            <View style={styles.textinfo}>
                <Text style={styles.textbold}>Cliente: </Text>
                <Text>{item.nome}</Text>
            </View>
            <View style={styles.textinfo}>
                <Text style={styles.textbold}>Placa: </Text>
                <Text>{item.placacaminhao}</Text>
            </View>
            <View style={styles.textinfo}>
                <Text style={styles.textbold}>Motorista: </Text>
                <Text>{item.motorista}</Text>
            </View>
            <TouchableOpacity
                style={styles.textinfo}
                onPress={() => this._pressPhone(item.celularmotorista)}
            >
                <Text style={styles.textbold}>Celular: </Text>
                <Text>{item.celularmotorista}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.textinfo}
                onPress={() => this._pressNfe(item.chavenfe)}
            >
                <Text style={styles.textbold}>Chave NFE: </Text>
                <Text>{item.chavenfe}</Text>
            </TouchableOpacity>
            <View style={styles.textinfo}>
                <Text style={styles.textbold}>Data Saída: </Text>
                <Text>{item.datasaida}</Text>
            </View>
        </Card>
    );

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading && (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                )}
                <FlatList
                    data={this.state.items}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }

    _pressNfe = chavenfe => {
        const url = 'https://www.danfeonline.com.br?chave_nfe=' + chavenfe;

        Linking.canOpenURL(url)
            .then(supported => {
                if (!supported) {
                    return Alert.alert('Falha na abertura do link');
                }
                return Linking.openURL(url);
            })
            .catch(err => console.error('Falha na abertura do link', err));
    };

    _pressPhone = phone => {
        return Linking.openURL(`tel:${phone}`);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        flex: 1,
        justifyContent: 'center'
    },
    textinfo: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    textbold: {
        fontWeight: 'bold'
    }
});
