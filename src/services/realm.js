import Realm from 'realm';
import ReceitasSchema from '../schemas/ReceitasSchema';
import DespesasSchema from '../schemas/DespesasSchema';

function getRealm(referencia) {
    let retorno = {
        receitas: 'R$ 0,00',
        despesas: 'R$ 0,00',
        saldo: 'R$ 0,00'
    };
    Realm.open({ schema: [ReceitasSchema, DespesasSchema] })
        .then(realm => {
            let loadedReceitas = realm.objects('receita').filtered(`dtLancamento CONTAINS "${referencia}"`);
            console.log(loadedReceitas);
            let totalReceitas = 0;
            let totalReceitasString = '';
            for (let receita of loadedReceitas) {
                totalReceitas += receita.valor;
            }
            totalReceitasString = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalReceitas);
            //Despesas
            let loadedDespesas = realm.objects('despesa').filtered(`dtLancamento CONTAINS "${referencia}"`);
            let totalDespesas = 0;
            let totalDespesasString = '';
            for (let despesa of loadedDespesas) {
                totalDespesas += despesa.valor;
            }
            totalDespesasString = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDespesas);
            let saldo = totalReceitas - totalDespesas;
            let saldoString = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldo);
            realm.close();
            retorno.receitas = totalReceitasString;
            retorno.despesas = totalDespesasString;
            retorno.saldo = saldoString;
        })
        .catch(error => {
            alert('Algo deu errado');
        });
    return retorno;
}