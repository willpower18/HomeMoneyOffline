import React, { useState } from 'react';
import { View, TextInput, ScrollView, Text, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { useNavigation, useRoute } from '@react-navigation/native';
import Realm from 'realm';
import ReceitasSchema from '../../schemas/ReceitasSchema';
import DespesasSchema from '../../schemas/DespesasSchema';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default function NovaReceita() {
    //Estado da Aplicação
    const [nomeReceita, setNomeReceita] = useState('');
    const [dataLancamento, setDataLancamento] = useState('');
    const [valor, setValor] = useState('');

    //Navegação
    const navigation = useNavigation();
    const route = useRoute();
    //Estado da Aplicação
    const [referencia, setReferencia] = useState(route.params.referencia);

    function navigateToHome() {
        navigation.navigate('Home');
    }

    //Função Para Salvar Registro
    async function handleSaveRegistry() {
        if (nomeReceita === '' | nomeReceita === null) {
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
            nome: nomeReceita,
            dtLancamento: dtLancamento,
            valor: valorFloat
        }
        try {
            Realm.open({ schema: [ReceitasSchema, DespesasSchema] })
                .then(realm => {
                    realm.write(() => {
                        realm.create('receita', data);
                    });
                    realm.close();
                })
                .catch(error => {
                    console.log(error);
                });
            alert('Receita Lançada Com Sucesso!');
            return;
        }
        catch (error) {
            console.log(error);
            alert('Não Foi Possível Lançar a Receita');
            return;
        }
    }

    //Retorno da Função
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
                <Text style={styles.headerTextRD}><Icon name="plus-circle" size={20} color="#00a99d" /> Nova Receita</Text>
                <View style={styles.dashBoard}>
                    <Text style={styles.InformText} >Informe os Dados Abaixo</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType={'default'}
                        maxLength={100}
                        placeholder={"Nome da Receita"}
                        value={nomeReceita}
                        autoCompleteType={"off"}
                        onChangeText={text => setNomeReceita(text)}
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