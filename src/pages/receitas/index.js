import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Realm from 'realm';
import ReceitasSchema from '../../schemas/ReceitasSchema';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default function Receitas() {
    const navigation = useNavigation();
    const route = useRoute();
    //Estado da Aplicação
    const [referencia, setReferencia] = useState(route.params.referencia);
    const [receitas, setReceitas] = useState([]);

    function navigateToHome() {
        navigation.navigate('Home');
    }

    function deleteItem(id) {
        try {
            Realm.open({ schema: [ReceitasSchema] })
                .then(realm => {
                    const receita = realm.objectForPrimaryKey('receita', id);
                    if (receita !== null | receita !== undefined) {
                        realm.write(() => {
                            realm.delete(receita);
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            loadData();
        }
        catch{
            alert('Não foi possível excluir!');
        }
    }

    async function loadData() {
        try {
            await Realm.open({ schema: [ReceitasSchema] })
                .then(realm => {
                    //Receitas
                    const loadedReceitas = realm.objects('receita').filtered(`dtLancamento CONTAINS "${referencia}"`);
                    setReceitas(loadedReceitas);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        catch (error) {
            alert('Erro ao Carregar Dados');
        }
    }

    useEffect(() => {
        const ScreenLoad = navigation.addListener('focus', () => {
            loadData()
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerBrand}></Text>
                <Text style={styles.headerText}>{referencia}</Text>
                <TouchableOpacity onPress={navigateToHome}>
                    <Icon name="arrow-left" size={30} color="#92278f" />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.headerTextRD}><Icon name="plus-circle" size={20} color="#00a99d" /> Receitas Lançadas</Text>
                <FlatList
                    data={receitas}
                    keyExtractor={receita => receita.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: receita }) => (
                        <View style={styles.dashBoard}>
                            <View style={styles.dashBoardHeader}>
                                <Text style={styles.titleDash}><Icon name="plus" size={20} color="#00a99d" /> {receita.nome}</Text>
                                <Text style={styles.titleDash}></Text>
                                <TouchableOpacity onPress={() => deleteItem(receita.id)}>
                                    <Icon name="trash" size={20} color="#ec008c" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.currency}>
                                <Text style={styles.fontCurrency}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(receita.valor)}</Text>
                            </View>
                        </View>
                    )}
                />


            </View>
        </View>
    );
}