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
    const [hoje, setHoje] = useState('');
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

    function getRef() {
        const today = new Date();
        const todayString = today.toJSON();
        const year = todayString.substr(0, 4);
        const month = todayString.substr(5, 2);
        const day = todayString.substr(8, 2);
        const ref = month + "/" + year;
        const dtCompleta = day + "/" + ref;
        setReferencia(ref);
        setHoje(dtCompleta);
    }

    async function loadData() {
        try {
            Realm.open({ schema: [ReceitasSchema, DespesasSchema] })
                .then(realm => {
                    //Receitas
                    let loadedReceitas = realm.objects('receita').filtered(`dtLancamento CONTAINS "${referencia}"`);
                    let totalReceitas = 0;
                    let totalReceitasString = '';
                    for (let receita of loadedReceitas) {
                        totalReceitas += receita.valor;
                    }
                    totalReceitasString = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalReceitas);
                    setReceitas(totalReceitasString);
                    //Despesas
                    let loadedDespesas = realm.objects('despesa').filtered(`dtLancamento CONTAINS "${referencia}"`);
                    let totalDespesas = 0;
                    let totalDespesasString = '';
                    for (let despesa of loadedDespesas) {
                        totalDespesas += despesa.valor;
                    }
                    totalDespesasString = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDespesas);
                    setdespesas(totalDespesasString);
                    let saldo = totalReceitas - totalDespesas;
                    let saldoString = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldo);
                    setSaldo(saldoString);
                });
            return;
        }
        catch (error) {
            alert('Erro ao Carregar Dados');
            return;
        }
    }

    useEffect(() => {
        const homeScreenLoad = navigation.addListener('focus', () => {
            getRef();
            loadData()
        });
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