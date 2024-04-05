import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "rgb(48,48,48)",
    },

    container: {
        alignItems: "center",
        flex: 1,
    },

    middle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    widget: {
        backgroundColor: "white",
        width: 145,
        height: 145,
        marginVertical: 8,
        marginHorizontal: 20,
        borderRadius: 35,
        // borderWidth: 1,
        // borderColor: "green",
    },

    button: {
        width: 150,
        height: 50,
        backgroundColor: "rgba(0,148,255,100)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 16,
    },

    textInput: {
        height: 55,
        fontSize: 18,
        marginVertical: 16,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "white",
        width: 335,
    },

    contactDropdown: {
        minHeight: 55,
        fontSize: 18,
        marginVertical: 16,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        alignItems: "center",
        paddingVertical: 8,
        backgroundColor: "white",
        width: 335,
    },

    textInputBodyAndroid: {
        textAlignVertical: "top",
        fontSize: 18,
        marginVertical: 16,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "white",
        width: 335,
    },

    textInputBodyIOS: {
        textAlignVertical: "top",
        fontSize: 18,
        marginVertical: 16,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "white",
        width: 335,
        minHeight: 200,
    },

    pfpContainer: {
        backgroundColor: "lightgrey",
        borderRadius: 100,
        height: 128,
        width: 128,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 64,
    },

    row: {
        flexDirection: "row",
    },

    bottomContainer: {
        flex: 1,
        justifyContent: "flex-end",
        width: "100%",
        // borderColor: "blue",
        // borderWidth: 2,
    },

    footerBar: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingVertical: 4,
        paddingHorizontal: 24,
        // borderColor: "blue",
        // borderWidth: 2,
    },
});

export default styles;
