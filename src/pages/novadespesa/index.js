import React, { useState } from 'react';
import { View, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import Realm from 'realm';
import ReceitasSchema from '../../schemas/ReceitasSchema';
import DespesasSchema from '../../schemas/DespesasSchema';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default function NovaDespesa() {
    //Navegação
    const navigation = useNavigation();
    const route = useRoute();
    function navigateToHome() {
        navigation.navigate('Home');
    }

    //Estado da Aplicação
    const [nomeDespesa, setNomeDespesa] = useState('');
    const [dataLancamento, setDataLancamento] = useState('');
    const [valor, setValor] = useState('');
    const [referencia, setReferencia] = useState(route.params.referencia);

    //Função Para Salvar Registro
    async function handleSaveRegistry() {
        if (nomeDespesa === '' | nomeDespesa === null) {
            alert('Preencha o nome da despesa');
            return;
        }

        if (valor === '' | valor === null) {
            alert('Preencha o Valor');
            return;
        }
        //Data
        let dtLancamento = '';
        if (dataLancamento === '' | dataLancamento === null) {
            const dtHoje = new Date().toJSON();
            dtLancamento = dtHoje.substr(8, 2);
            dtLancamento += '/' + dtHoje.substr(5, 2);
            dtLancamento += '/' + dtHoje.substr(0, 4);
        }
        else {
            if (dataLancamento.length < 10) {
                alert('Preencha uma data Válida');
                return;
            }
            else {
                dtLancamento = dataLancamento;
            }
        }
        //Id
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let text = "";
        for (let i = 0; i < 20; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        //Valor
        var formatedValue = valor.replace('R', '');
        formatedValue = formatedValue.replace('$', '');
        formatedValue = formatedValue.replace('.', '');
        formatedValue = formatedValue.replace(',', '.');
        var valorFloat = parseFloat(formatedValue);

        const data = {
            id: text,
            nome: nomeDespesa,
            dtLancamento: dtLancamento,
            valor: valorFloat
        }
        try {
            Realm.open({ schema: [ReceitasSchema, DespesasSchema] })
                .then(realm => {
                    realm.write(() => {
                        realm.create('despesa', data);
                    });
                    realm.close();
                })
                .catch(error => {
                    console.log(error);
                });
            alert('Despesa Lançada Com Sucesso!');
        }
        catch (error) {
            console.log(error);
            alert('Não Foi Possível Lançar a Despesa');
        }
    }

    //Retorno do componente
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerBrand}></Text>
                <Text style={styles.headerText}>{referencia}</Text>
                <TouchableOpacity onPress={navigateToHome}>
                    <Icon name="arrow-left" size={30} color="#92278f" />
                </TouchableOpacity>
            </View>
            <ScrollView keyboardDismissMode="interactive" showsVerticalScrollIndicator={false}>
                <Text style={styles.headerTextRD}><Icon name="minus-circle" size={20} color="#ec008c" /> Nova Despesa</Text>
                <View style={styles.dashBoard}>
                    <Text style={styles.InformText} >Informe os Dados Abaixo</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType={'default'}
                        maxLength={100}
                        placeholder={"Nome da Despesa"}
                        value={nomeDespesa}
                        autoCompleteType={"off"}
                        onChangeText={text => setNomeDespesa(text)}
                    />
                    <TextInputMask
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={dataLancamento}
                        onChangeText={text => {
                            setDataLancamento(text)
                        }}
                        style={styles.input}
                        placeholder={"DD/MM/YYYY"}
                    />
                    <Text style={{ fontSize: 12, marginBottom: 5 }}>* Deixe a data em branco para lançamentos do dia</Text>
                    <TextInputMask
                        type={'money'}
                        options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: 'R$',
                            suffixUnit: ''
                        }}
                        value={valor}
                        onChangeText={text => {
                            setValor(text)
                        }}
                        style={styles.input}
                        placeholder={"R$"}
                    />
                    <TouchableOpacity style={styles.action} onPress={handleSaveRegistry}>
                        <Icon name="check" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

    );
}