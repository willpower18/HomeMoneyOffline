const DespesasSchema = {
    name: 'despesa',
    primaryKey: 'id',
    properties: {
        id: { type: 'string', indexed: true },
        nome: 'string',
        dtLancamento: 'string',
        valor: 'float'
    }
}

export default DespesasSchema;