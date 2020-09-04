import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 30,
    },
    InformText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
        color: '#737380'
    },
    input: {
        borderColor: '#737380',
        borderWidth: 0.5,
        borderRadius: 8,
        marginTop: 10,
        paddingLeft: 10,
        height: 50,
        width: '75%',
        fontSize: 20,
        color: '#737380'
    },
    receitas: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#00a99d'
    },
    despesas: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#ec008c'
    },
    saldo: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#ffcb05'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerBrand: {
        fontSize: 24,
        paddingTop: 10,
        color: '#92278f',
        fontWeight: 'bold',
    },
    homeIcon: {
        paddingTop: 10,
    },
    dashBoard: {
        marginTop: 15,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    dashBoardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleDash: {
        fontSize: 16,
        color: '#4c4c4c',
    },
    titleDashResult: {
        fontSize: 24,
        color: '#ffcb05',
        fontWeight: 'bold',
    },
    valueDash: {
        fontSize: 24,
        color: '#4c4c4c',
        marginTop: 5,
        fontWeight: 'bold',
    },

    dashBoard2: {
        marginTop: 5,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    dashBoardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleDash2: {
        fontSize: 24,
        color: '#ec008c',
        fontWeight: 'bold',
    },
    lineButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    IncidentValue: {
        fontSize: 16,
        color: '#737380',
    },
    lancReceita: {
        fontSize: 16,
        color: '#00a99d',
    },
    lancDespesa: {
        fontSize: 16,
        color: '#ec008c',
    },
    lancSaldo: {
        fontSize: 16,
        color: '#ffcb05',
    },
    lancDot: {
        textAlign: 'center'
    },
    contactBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    heroTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#4c4c4c',
        lineHeight: 30,
    },
    heroDescription: {
        fontSize: 15,
        color: "#737380",
        marginTop: 16,
    },
    actions: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",

    },
    action: {
        marginTop: 10,
        backgroundColor: "#92278f",
        borderRadius: 8,
        height: 50,
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        color: "#92278f",
        fontSize: 12,
        textAlign: 'center',
    },
    headerText: {
        fontSize: 15,
        paddingTop: 10,
        color: '#737380',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 48,
        color: '#4c4c4c',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380'
    },
    incidentList: {
        marginTop: 32,
    },
    Incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    IncidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
    },
    IncidentValue_: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380',
    },
    detailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailsButtonText: {
        marginTop: 5,
        color: '#737380',
        fontSize: 15,
        fontWeight: 'bold',
    },
    headerTextRD: {
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 10,
        color: '#737380',
        fontWeight: 'bold',
    },
});