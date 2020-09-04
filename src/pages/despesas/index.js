import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Realm from 'realm';
import DespesasSchema from '../../schemas/DespesasSchema';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default function Despesas() {
    const navigation = useNavigation();
    const route = useRoute();
    //Estado da Aplicação
    const [referencia, setReferencia] = useState(route.params.referencia);
    const [despesas, setDespesas] = useState([]);

    function navigateToHome() {
        navigation.navigate('Home');
    }

    function deleteItem(id) {
        try {
            Realm.open({ schema: [DespesasSchema] })
                .then(realm => {
                    const despesa = realm.objectForPrimaryKey('despesa', id);
                    if (despesa !== null | despesa !== undefined) {
                        realm.write(() => {
                            realm.delete(despesa);
                        });
                    }
                    //realm.close();
                });
            loadData();
        }
        catch{
            alert('Não foi possível excluir!');
            return;
        }
    }

    async function loadData() {
        try {
            Realm.open({ schema: [DespesasSchema] })
                .then(realm => {
                    //Despesas
                    let despesasArr = [];
                    let loadedDespesas = realm.objects('despesa').filtered(`dtLancamento CONTAINS "${referencia}"`);
                    for (let despesa of loadedDespesas) {
                        despesasArr.push(despesa);
                    }
                    setDespesas(despesasArr);
                    // realm.close();
                });
            return;
        }
        catch (error) {
            alert('Erro ao Carregar Dados');
            return;
        }
    }

    useEffect(() => {
        const ScreenLoad = navigation.addListener('focus', () => {
            loadData();
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
                <Text style={styles.headerTextRD}><Icon name="minus-circle" size={20} color="#ec008c" /> Despesas Lançadas</Text>
            </View>
            <FlatList
                data={despesas}
                keyExtractor={despesa => despesa.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: despesa }) => (
                    <View style={styles.dashBoard}>
                        <View style={styles.dashBoardHeader}>
                            <Text style={styles.titleDash}><Icon name="minus" size={20} color="#ec008c" /> {despesa.nome}</Text>
                            <Text style={styles.titleDash}></Text>
                            <TouchableOpacity onPress={() => deleteItem(despesa.id)}>
                                <Icon name="trash" size={20} color="#ec008c" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.currency}>
                            <Text style={styles.fontCurrency}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(despesa.valor)}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}