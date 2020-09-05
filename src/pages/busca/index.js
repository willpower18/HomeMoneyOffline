import React, { useState } from 'react';
import { View, ScrollView, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Realm from 'realm';
import DespesasSchema from '../../schemas/DespesasSchema';
import ReceitasSchema from '../../schemas/ReceitasSchema';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default function Busca() {
    const navigation = useNavigation();
    const [dtBusca, setDtBusca] = useState('');
    const [receitas, setReceitas] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [totalReceitas, setTotalReceitas] = useState('R$ 0,00');
    const [totalDespesas, setTotaldespesas] = useState('R$ 0,00');
    const [saldo, setSaldo] = useState('R$ 0,00');

    function navigateToHome() {
        navigation.navigate('Home');
    }

    function maskInput(inputVal) {
        let tamanho = inputVal.length;
        if (tamanho == 2) {
            inputVal += '/';
        }
        setDtBusca(inputVal);
    }

    async function Busca() {
        if (dtBusca === '' | dtBusca === undefined) {
            alert('Digite uma Referência para Buscar!');
            return;
        }

        try {
            await Realm.open({ schema: [ReceitasSchema, DespesasSchema] })
                .then(realm => {
                    let loadedReceitas = realm.objects('receita').filtered(`dtLancamento CONTAINS "${dtBusca}"`);
                    let loadedDespesas = realm.objects('despesa').filtered(`dtLancamento CONTAINS "${dtBusca}"`);
                    if (loadedReceitas.length > 0 | loadedDespesas.length > 0) {
                        let totalReceitas_ = loadedReceitas.sum('valor');
                        let totalDespesas_ = loadedDespesas.sum('valor');
                        let saldo_ = totalReceitas_ - totalDespesas_;
                        const SString = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldo_);
                        const RString = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalReceitas_);
                        const DString = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDespesas_);
                        setReceitas(loadedReceitas);
                        setDespesas(loadedDespesas);
                        setTotalReceitas(RString);
                        setTotaldespesas(DString);
                        setSaldo(SString);
                    }
                    else {
                        alert('Nenhum Registro Encontrado');
                        return;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
        catch (error) {
            alert('Erro ao Carregar Dados');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerBrand}></Text>
                    <Text style={styles.headerText}>Visualizar Balanço Financeiro</Text>
                    <TouchableOpacity onPress={navigateToHome}>
                        <Icon name="arrow-left" size={30} color="#92278f" />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.headerTextRD}><Icon name="search" size={20} color="#ffcb05" /> Efetuar Busca</Text>
            </View>
            <View style={styles.dashBoard}>
                <Text style={styles.InformText} >Informe o Mês e o Ano Para Buscar</Text>
                <View style={styles.dashBoardHeader}>
                    <TextInput
                        style={styles.input}
                        autoCompleteType={"off"}
                        keyboardType={'numeric'}
                        maxLength={7}
                        placeholder={"XX/XXXX"}
                        value={dtBusca}
                        onChangeText={text => maskInput(text)}
                        autoFocus={true}
                    />
                    <TouchableOpacity keyboardDismissMode={""} style={styles.action} onPress={() => Busca()}>
                        <Icon name="search" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView keyboardDismissMode={'interactive'} showsVerticalScrollIndicator={false}>
                <View style={styles.dashBoard2}>
                    {
                        receitas.map((receita) =>
                            <View key={receita.id} style={styles.dashBoardHeader}>
                                <Text style={styles.IncidentValue}>{receita.nome}</Text>
                                <Text style={styles.lancReceita}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(receita.valor)}</Text>
                            </View>
                        )
                    }
                    <Text>-</Text>
                    {
                        despesas.map((despesa) =>
                            <View key={despesa.id} style={styles.dashBoardHeader}>
                                <Text style={styles.IncidentValue}>{despesa.nome}</Text>
                                <Text style={styles.lancDespesa}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(despesa.valor)}</Text>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
            <View style={styles.dashBoard}>
                <View style={styles.dashBoardHeader}>
                    <Text style={styles.receitas}>Total de Receitas</Text>
                    <Text style={styles.receitas}>{totalReceitas}</Text>
                </View>
                <View style={styles.dashBoardHeader}>
                    <Text style={styles.despesas}>Total de Despesas</Text>
                    <Text style={styles.despesas}>{totalDespesas}</Text>
                </View>
                <View style={styles.dashBoardHeader}>
                    <Text style={styles.saldo}>Saldo</Text>
                    <Text style={styles.saldo}>{saldo}</Text>
                </View>
            </View>

        </SafeAreaView>
    );
}