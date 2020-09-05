import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Realm from 'realm';
import ReceitasSchema from '../../schemas/ReceitasSchema';
import DespesasSchema from '../../schemas/DespesasSchema';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default function Home() {
    //Estado da Aplicação
    const [receitas, setReceitas] = useState('R$ 0,00');
    const [despesas, setdespesas] = useState('R$ 0,00');
    const [referencia, setReferencia] = useState('-');
    const [saldo, setSaldo] = useState('R$ 0,00');

    //Navegação
    const navigation = useNavigation();
    const route = useRoute();

    function navigateToReceitas() {
        navigation.navigate('Receitas', { referencia });
    }

    function navigateToDespesas() {
        navigation.navigate('Despesas', { referencia });
    }

    function navigateToBusca() {
        navigation.navigate('Busca');
    }

    function navigateToNovaReceita() {
        navigation.navigate('NovaReceita', { referencia });
    }

    function navigateToNovaDespesa() {
        navigation.navigate('NovaDespesa', { referencia });
    }

    async function loadData() {
        let retorno = {
            referencia: '-',
            receitas: 'R$ 0,00',
            despesas: 'R$ 0,00',
            saldo: 'R$ 0,00'
        };

        try {
            const today = new Date();
            const todayString = today.toJSON();
            const year = todayString.substr(0, 4);
            const month = todayString.substr(5, 2);
            const ref = month + "/" + year;
            await Realm.open({ schema: [ReceitasSchema, DespesasSchema] })
                .then(realm => {
                    //Receitas
                    let totalReceitas = realm.objects('receita').filtered(`dtLancamento CONTAINS "${ref}"`).sum('valor');
                    let totalReceitasString = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalReceitas);
                    //Despesas
                    let totalDespesas = realm.objects('despesa').filtered(`dtLancamento CONTAINS "${ref}"`).sum('valor');
                    let totalDespesasString = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDespesas);
                    //Saldo
                    let saldo = totalReceitas - totalDespesas;
                    let saldoString = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldo);
                    retorno.referencia = ref;
                    retorno.despesas = totalDespesasString;
                    retorno.receitas = totalReceitasString;
                    retorno.saldo = saldoString;
                })
                .catch(error => {
                    console.log(error);
                });
        }
        catch (error) {
            alert('Erro ao Carregar Dados');
        }

        return retorno;
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const returned = await loadData();
            setReferencia(returned.referencia);
            setReceitas(returned.receitas);
            setdespesas(returned.despesas);
            setSaldo(returned.saldo);
        });
        return unsubscribe;
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerBrand}>Minhas Finanças</Text>
                <Text style={styles.headerText}>{referencia}</Text>
            </View>
            <View style={styles.dashBoard}>
                <View style={styles.dashBoardHeader}>
                    <Text style={styles.titleDash}>Receitas</Text>
                    <Icon name="plus" size={30} color="#00a99d" />
                </View>
                <Text style={styles.valueDash}>{receitas}</Text>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToReceitas()}>
                    <Text style={styles.detailsButtonText}>Ver Lançamentos</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dashBoard2}>
                <View style={styles.dashBoardHeader}>
                    <Text style={styles.titleDash2}>Despesas</Text>
                    <Icon name="minus" size={30} color="#ec008c" />
                </View>
                <Text style={styles.valueDash}>{despesas}</Text>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDespesas()}>
                    <Text style={styles.detailsButtonText}>Ver Lançamentos</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dashBoard2}>
                <View style={styles.dashBoardHeader}>
                    <Text style={styles.titleDashResult}>Saldo</Text>
                    <Icon name="usd" size={30} color="#ffcb05" />
                </View>
                <Text style={styles.valueDash}>{saldo}</Text>
            </View>
            <View style={styles.dashBoard2}>
                <View style={styles.lineButtons}>
                    <TouchableOpacity style={styles.action} onPress={() => navigateToNovaReceita()}>
                        <Icon name="plus" size={30} color="#92278f" />
                        <Text style={styles.actionText}>Lançar Receita</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={() => navigateToNovaDespesa()}>
                        <Icon name="minus" size={30} color="#92278f" />
                        <Text style={styles.actionText}>Lançar Despesa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={() => navigateToBusca()}>
                        <Icon name="search" size={30} color="#92278f" />
                        <Text style={styles.actionText}>Efetuar Busca</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}