import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Icon, List, ListItem, Button } from 'react-native-elements';

import _ from 'lodash';
import { API } from '../../utils/api';
import realm from '../../models/schemas';
import moment from 'moment';

import saveCrops from './crops';
import saveCultivars from './cultivars';
import saveSchedules from './schedules';
import savePlaces from './places';
import saveProductions from './productions';
import saveProductionDetails from './productionsDetails';
import saveSeedBrands from './seedBrands';
import saveQuestions from './questions';
import saveAnswers from './answers';
import saveLastSync from './saveLastSync';

class SyncView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdateProductions: false,
            isUpdateSchedules: false,
            isUpdateAnswersPlace: false,
            isSchedulesInSync: false,
            isCropsInSync: false,
            isCultivarsInSync: false,
            isPlacesInSync: false,
            isProductionsInSync: false,
            isProductionDetailsInSync: false,
            isSeedBrandsInSync: false,
            isQuestionsInSync: false,
            isAnswersInSync: false,
            isLastSyncInSync: false,
            canClickButtons: true
        };
    }

    alertConfirm() {
        Alert.alert(
            'Sincronização Total',
            'Deseja efetuar a sincronização total? \n O processo pode demorar',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'OK', onPress: () => this.smartSync(false) }
            ],
            { cancelable: true }
        );
    }

    async smartSync(smart) {
        await this.setState({ canClickButtons: false });
        let lastDateSync = 0;
        if (smart) {
            lastDateSync = realm.objects('LastSync').filtered('id = 1')[0].date;

            if (!lastDateSync) {
                lastDateSync = 0;
            }

            if (lastDateSync) {
                lastDateSync = moment(lastDateSync).toISOString();
            }
        }

        //ENVIAR ATUALIZAÇÕES DA AGENDA PARA O SERVIDOR
        let schedules = realm.objects('Schedule');
        let itemsSchedules = schedules.reduce((acc, x) => {
            acc[x.id] = x;
            return acc;
        }, {});
        await API.updateSyncSchedules(itemsSchedules)
            .then(response => response.json())
            .then(response => {
                realm.write(() => {
                    realm.delete(schedules);
                });
                this.setState({ isUpdateSchedules: true });
            })
            .catch(err => {
                console.error(err);
            });

        //ENVIAR ATUALIZAÇÕES DAS PRODUÇÕES PARA O SERVIDOR
        let productions = realm
            .objects('Production')
            .filtered('needSync = true');
        let itemsProductions = productions.reduce((acc, x) => {
            acc[x.id] = x;
            return acc;
        }, {});
        await API.updateSyncProductions(itemsProductions)
            .then(response => response.json())
            .then(response => {
                realm.write(() => {
                    realm.delete(productions);
                });
                this.setState({ isUpdateProductions: true });
            })
            .catch(err => {
                console.error(err);
            });

        //ENVIAR ATUALIZAÇÕES DAS RESPOSTAS DAS PRODUÇÕES PARA O SERVIDOR
        let answersPlace = realm.objects('AnswerPlace');
        if (answersPlace.length > 0) {
            let itemsAnswersPlace = _.reduce(
                answersPlace,
                (obj, param) => {
                    obj[param.id] = param;
                    return obj;
                },
                {}
            );

            await API.updateSyncAnswersPlace(itemsAnswersPlace)
                .then(response => response.json())
                .then(response => {
                    if (response.schedules == true) {
                        realm.write(() => {
                            let all = realm.objects('AnswerPlace');
                            realm.delete(all);
                        });
                    }
                    this.setState({ isUpdateAnswersPlace: true });
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            this.setState({ isUpdateAnswersPlace: true });
        }

        //RECEBER AS SAFRAS
        await API.getSyncCrops()
            .then(response => response.json())
            .then(response => {
                if (
                    response &&
                    response.error &&
                    response.error == 'token_expired'
                ) {
                    const { navigate } = this.props.navigation;
                    navigate('Logout');
                }
                realm.write(() => {
                    saveCrops(response.crops).then(() => {
                        this.setState({ isCropsInSync: true });
                    });
                });
            })
            .catch(err => {
                console.error(err);
            });

        //RECEBER AS CULTURAS
        await API.getSyncCultivars()
            .then(response => response.json())
            .then(response => {
                realm.write(() => {
                    saveCultivars(response.cultivars).then(() => {
                        this.setState({ isCultivarsInSync: true });
                    });
                });
            })
            .catch(err => {
                console.error(err);
            });

        //RECEBER AS MARCAS DE SEMENTES
        await API.getSyncSeedBrands()
            .then(response => response.json())
            .then(response => {
                realm.write(() => {
                    saveSeedBrands(response.seedBrands).then(() => {
                        this.setState({ isSeedBrandsInSync: true });
                    });
                });
            })
            .catch(err => {
                console.error(err);
            });

        //RECEBER FAZENDAS
        await API.getSyncPlaces(lastDateSync)
            .then(response => response.json())
            .then(response => {
                realm.write(() => {
                    savePlaces(response.places, smart).then(() => {
                        this.setState({ isPlacesInSync: true });
                    });
                });
            })
            .catch(err => {
                console.error(err);
            });

        //RECEBER PRODUÇÕES
        await API.getSyncProductions(lastDateSync)
            .then(response => response.json())
            .then(response => {
                realm.write(() => {
                    saveProductions(response.productions).then(() => {
                        this.setState({ isProductionsInSync: true });
                    });
                });
            })
            .catch(err => {
                console.error(err);
            });

        //RECEBER PRODUÇÕES
        await API.getSyncProductionDetails(lastDateSync)
            .then(response => response.json())
            .then(response => {
                realm.write(() => {
                    saveProductionDetails(response.productionDetails).then(
                        () => {
                            this.setState({ isProductionDetailsInSync: true });
                        }
                    );
                });
            })
            .catch(err => {
                console.error(err);
            });

        //RECEBER VISITAS
        await API.getSyncSchedules()
            .then(response => response.json())
            .then(response => {
                realm.write(() => {
                    saveSchedules(response.schedules).then(() => {
                        this.setState({ isSchedulesInSync: true });
                    });
                });
            })
            .catch(err => {
                console.error(err);
            });

        //RECEBER VISITAS
        await API.getSyncQuestions()
            .then(response => response.json())
            .then(response => {
                realm.write(() => {
                    saveQuestions(response.questions).then(() => {
                        this.setState({ isQuestionsInSync: true });
                    });
                });
            })
            .catch(err => {
                console.error(err);
            });

        //RECEBER OS RESPOSTAS
        await API.getSyncAnswers()
            .then(response => response.json())
            .then(response => {
                realm.write(() => {
                    saveAnswers(response.answers).then(() => {
                        this.setState({ isAnswersInSync: true });
                    });
                });
            })
            .catch(err => {
                console.error(err);
            });

        await saveLastSync()
            .then(() => {
                this.setState({ isLastSyncInSync: true });
            })
            .catch(err => {
                console.error(err);
            });

        await this.setState({ canClickButtons: true });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ marginBottom: 5 }}>
                    <Button
                        icon={{ name: 'cached' }}
                        backgroundColor="#32CD32"
                        title="Sincronizar Atualizações"
                        onPress={this.smartSync.bind(this, true)}
                        disabled={!this.state.canClickButtons}
                    />
                </View>
                <View>
                    <Button
                        icon={{ name: 'cached' }}
                        backgroundColor="#1E90FF"
                        title="Sincronização Total"
                        onPress={this.alertConfirm.bind(this, false)}
                        disabled={!this.state.canClickButtons}
                    />
                </View>
                <List containerStyle={{ marginTop: 5 }}>
                    <ListItem
                        titleStyle={styles.list}
                        hideChevron={true}
                        title="Atualização Agenda"
                        leftIcon={{
                            name: this.state.isUpdateSchedules
                                ? 'check'
                                : 'cached',
                            color: this.state.isUpdateSchedules ? '#32CD32' : ''
                        }}
                    />
                    <ListItem
                        titleStyle={styles.list}
                        hideChevron={true}
                        title="Atualização Fazendas"
                        leftIcon={{
                            name: this.state.isUpdateProductions
                                ? 'check'
                                : 'cached',
                            color: this.state.isUpdateProductions
                                ? '#32CD32'
                                : ''
                        }}
                    />
                    <ListItem
                        titleStyle={styles.list}
                        hideChevron={true}
                        title="Atualização Questionário"
                        leftIcon={{
                            name: this.state.isUpdateAnswersPlace
                                ? 'check'
                                : 'cached',
                            color: this.state.isUpdateAnswersPlace
                                ? '#32CD32'
                                : ''
                        }}
                    />
                    <ListItem
                        titleStyle={styles.list}
                        hideChevron={true}
                        title="Safras"
                        leftIcon={{
                            name: this.state.isCropsInSync ? 'check' : 'cached',
                            color: this.state.isCropsInSync ? '#32CD32' : ''
                        }}
                    />
                    <ListItem
                        titleStyle={styles.list}
                        hideChevron={true}
                        title="Cultivares"
                        leftIcon={{
                            name: this.state.isCultivarsInSync
                                ? 'check'
                                : 'cached',
                            color: this.state.isCultivarsInSync ? '#32CD32' : ''
                        }}
                    />
                    <ListItem
                        titleStyle={styles.list}
                        hideChevron={true}
                        title="Marcas de Sementes"
                        leftIcon={{
                            name: this.state.isSeedBrandsInSync
                                ? 'check'
                                : 'cached',
                            color: this.state.isSeedBrandsInSync
                                ? '#32CD32'
                                : ''
                        }}
                    />
                    <ListItem
                        titleStyle={styles.list}
                        hideChevron={true}
                        title="Fazendas"
                        leftIcon={{
                            name: this.state.isPlacesInSync
                                ? 'check'
                                : 'cached',
                            color: this.state.isPlacesInSync ? '#32CD32' : ''
                        }}
                    />
                    <ListItem
                        titleStyle={styles.list}
                        hideChevron={true}
                        title="Produções"
                        leftIcon={{
                            name: this.state.isProductionsInSync
                                ? 'check'
                                : 'cached',
                            color: this.state.isProductionsInSync
                                ? '#32CD32'
                                : ''
                        }}
                    />
                    <ListItem
                        titleStyle={styles.list}
                        hideChevron={true}
                        title="Detalhes Produção"
                        leftIcon={{
                            name: this.state.isProductionDetailsInSync
                                ? 'check'
                                : 'cached',
                            color: this.state.isProductionDetailsInSync
                                ? '#32CD32'
                                : ''
                        }}
                    />
                    <ListItem
                        titleStyle={styles.list}
                        hideChevron={true}
                        title="Agenda"
                        leftIcon={{
                            name: this.state.isSchedulesInSync
                                ? 'check'
                                : 'cached',
                            color: this.state.isSchedulesInSync ? '#32CD32' : ''
                        }}
                    />
                    <ListItem
                        titleStyle={styles.list}
                        hideChevron={true}
                        title="Perguntas"
                        leftIcon={{
                            name: this.state.isQuestionsInSync
                                ? 'check'
                                : 'cached',
                            color: this.state.isQuestionsInSync ? '#32CD32' : ''
                        }}
                    />
                    <ListItem
                        titleStyle={styles.list}
                        hideChevron={true}
                        title="Respostas"
                        leftIcon={{
                            name: this.state.isAnswersInSync
                                ? 'check'
                                : 'cached',
                            color: this.state.isAnswersInSync ? '#32CD32' : ''
                        }}
                    />
                    <ListItem
                        titleStyle={styles.list}
                        hideChevron={true}
                        title="Recursos"
                        leftIcon={{
                            name: this.state.isLastSyncInSync
                                ? 'check'
                                : 'cached',
                            color: this.state.isLastSyncInSync ? '#32CD32' : ''
                        }}
                    />
                </List>
            </ScrollView>
        );
    }
}

const Sync = StackNavigator({
    SyncView: {
        screen: SyncView,
        path: '/',
        navigationOptions: ({ navigation }) => ({
            title: 'SINCRONIZAÇÃO',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#00a65a'
            },
            headerLeft: (
                <Icon
                    name="menu"
                    size={30}
                    type="entypo"
                    style={{ paddingLeft: 10 }}
                    onPress={() => navigation.navigate('DrawerOpen')}
                    color="#fff"
                />
            )
        })
    }
});

Sync.navigationOptions = {
    drawerLabel: 'Sincronizar',
    drawerIcon: ({ tintColor }) => (
        <Icon
            name="refresh"
            size={30}
            style={{
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            type="material-community"
            color={tintColor}
        />
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5
    },
    list: {
        fontSize: 10
    }
});

export default Sync;
