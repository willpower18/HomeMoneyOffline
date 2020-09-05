import Realm from 'realm';
import ReceitasSchema from '../schemas/ReceitasSchema';
import DespesasSchema from '../schemas/DespesasSchema';

export default function getRealm() {
    return Realm.open({
        schema: [ReceitasSchema, DespesasSchema],
    });
}