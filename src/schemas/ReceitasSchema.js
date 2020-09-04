const ReceitasSchema = {
    name: 'receita',
    primaryKey: 'id',
    properties: {
        id: { type: 'string', indexed: true },
        nome: 'string',
        dtLancamento: 'string',
        valor: 'float'
    }
}
export default ReceitasSchema;