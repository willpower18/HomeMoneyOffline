import React, { useState } from 'react';
import { View, ScrollView, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default function Busca() {
    const navigation = useNavigation();
    const [dtBusca, setDtBusca] = useState('');

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

    function Busca() {
        alert('Foi');
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
                        keyboardType={'numeric'}
                        maxLength={7}
                        placeholder={"XX/XXXX"}
                        value={dtBusca}
                        onChangeText={text => maskInput(text)}
                        autoFocus={true}
                    />
                    <TouchableOpacity style={styles.action} onPress={() => Busca()}>
                        <Icon name="search" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView keyboardDismissMode={'interactive'} showsVerticalScrollIndicator={false}>
                <View style={styles.dashBoard2}>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Receita</Text>
                        <Text style={styles.lancReceita}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Receita</Text>
                        <Text style={styles.lancReceita}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Receita</Text>
                        <Text style={styles.lancReceita}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Receita</Text>
                        <Text style={styles.lancReceita}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Receita</Text>
                        <Text style={styles.lancReceita}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Receita</Text>
                        <Text style={styles.lancReceita}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Despesa</Text>
                        <Text style={styles.lancDespesa}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Despesa</Text>
                        <Text style={styles.lancDespesa}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Despesa</Text>
                        <Text style={styles.lancDespesa}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Despesa</Text>
                        <Text style={styles.lancDespesa}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Despesa</Text>
                        <Text style={styles.lancDespesa}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Despesa</Text>
                        <Text style={styles.lancDespesa}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Despesa</Text>
                        <Text style={styles.lancDespesa}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Despesa</Text>
                        <Text style={styles.lancDespesa}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Despesa</Text>
                        <Text style={styles.lancDespesa}>R$ -</Text>
                    </View>
                    <View style={styles.dashBoardHeader}>
                        <Text style={styles.IncidentValue}>Despesa</Text>
                        <Text style={styles.lancDespesa}>R$ -</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.dashBoard}>
                <View style={styles.dashBoardHeader}>
                    <Text style={styles.receitas}>Total de Receitas</Text>
                    <Text style={styles.receitas}>R$ -</Text>
                </View>
                <View style={styles.dashBoardHeader}>
                    <Text style={styles.despesas}>Total de Despesas</Text>
                    <Text style={styles.despesas}>R$ -</Text>
                </View>
                <View style={styles.dashBoardHeader}>
                    <Text style={styles.saldo}>Saldo</Text>
                    <Text style={styles.saldo}>R$ -</Text>
                </View>
            </View>

        </SafeAreaView>
    );
}