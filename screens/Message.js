// Dealing with keyboards are a nightmare..
import React, { useEffect, useReducer, useState } from "react";
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";
import styles from "../styles";
import NavigationFooterBar from "../components/NavigationFooterBar";
import * as Contacts from "expo-contacts";
import * as SMS from "expo-sms";
import * as MailComposer from "expo-mail-composer";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import {
    addOrUpdateUserContacts,
    getUserContacts,
} from "../firebase/firestore";

const Message = ({ route, navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [type, setType] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [listDataEmail, setListDataEmail] = useState([]);
    const [listDataPhoneNumber, setListDataPhoneNumber] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const contactData = await getUserContacts();
                setContacts(contactData);

                console.log("Turning contacts into proper list data..");
                let listDataArrayEmail = contactData.map((item) => {
                    if (!item.email)
                        return {
                            key: item.id,
                            value: item.name,
                            disabled: true,
                        };
                    else
                        return {
                            key: item.id,
                            value: item.name,
                            disabled: false,
                        };
                });

                setListDataEmail(listDataArrayEmail);

                let listDataArrayPhoneNumber = contactData.map((item) => {
                    if (!item.phoneNumber)
                        return {
                            key: item.id,
                            value: item.name,
                            disabled: true,
                        };
                    else
                        return {
                            key: item.id,
                            value: item.name,
                            disabled: false,
                        };
                });

                setListDataPhoneNumber(listDataArrayPhoneNumber);
            } catch (error) {
                Alert.alert("Error", "Could not retrieve contacts...", ["Ok"]);
                return;
            }
        };

        if (route.params && route.params.type) {
            setType(route.params.type);
        } else {
            setType("sms");
        }
        if (contacts.length === 0) fetchContacts();
    }, []);

    const importContactsHandler = async () => {
        const status = await Contacts.requestPermissionsAsync();

        if (status === "denied") {
            Alert.alert(
                "Insufficient Permissions",
                "You need to grant contact permissons to use this feature. Please allow access in your device's settings",
                ["Ok"]
            );
            return;
        }
        console.log("Contacts permission granted.. Grabbing data");
        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
            sort: "firstName",
        });

        if (data.length > 0) {
            const contactArr = [];
            for (i = 0; i < data.length; i++) {
                const contactObject = {
                    id: i + 1,
                    name: "",
                    phoneNumber: "",
                    email: "",
                };

                if (data[i] && data[i].name) {
                    contactObject.name = data[i].name;
                }

                if (data[i] && data[i].phoneNumbers) {
                    contactObject.phoneNumber = data[i].phoneNumbers[0].digits;
                }

                if (data[i] && data[i].emails) {
                    contactObject.email = data[i].emails[0].email;
                }
                contactArr.push(contactObject);
            }
            setContacts(contactArr);
            addOrUpdateUserContacts(contactArr);
            let listDataArray = contactArr.map((item) => {
                return { key: item.id, value: item.name };
            });
            setListData(listDataArray);
        }
        Alert.alert("Success", "Your contacts have been imported", ["Ok"]);
    };

    const switchType = () => {
        setType(type === "sms" ? "email" : "sms");
        resetFields();
        setSelectedContacts([]);
    };

    const getEmails = () => {
        const emails = [];

        selectedContacts.forEach((item) => {
            const contact = contacts.find((contact) => contact.id === item);
            if (contact) emails.push(contact.email);
        });
        return emails;
    };

    const getPhoneNumbers = () => {
        const phoneNumbers = [];

        selectedContacts.forEach((item) => {
            const contact = contacts.find((contact) => contact.id == item);
            if (contact) phoneNumbers.push(contact.phoneNumber);
        });
        return phoneNumbers;
    };

    const canSendMessage = () => {
        if (selectedContacts.length === 0) {
            return false;
        }
        return true;
    };

    const resetFields = () => {
        setBody("");
        setSubject("");
    };

    const sendMessageWithEmail = async () => {
        const isAvailable = await MailComposer.isAvailableAsync();

        const canSend = canSendMessage();

        if (isAvailable && canSend) {
            const emails = getEmails();
            console.log("Emails", emails);
            const options = {
                recipients: emails,
                subject: subject,
                body: body,
            };
            MailComposer.composeAsync(options).then((result) =>
                console.log(result.status)
            );
        } else if (!canSend) {
            Alert.alert("Error", "No contacts have been selected.", ["Ok"]);
            return;
        } else {
            console.log("Email is not available on this device");
        }
    };

    const sendMessageWithSMS = async () => {
        const isAvailable = await SMS.isAvailableAsync();
        const canSend = canSendMessage();
        if (isAvailable && canSend) {
            const phoneNumbers = getPhoneNumbers();
            const { result } = await SMS.sendSMSAsync(phoneNumbers, body);
            console.log(result);
        } else if (!canSend) {
            Alert.alert("Error", "No contacts have been selected.", ["Ok"]);
            return;
        } else {
            console.log("SMS is not available on this device");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ ...styles.screen, justifyContent: "flex-end" }}
        >
            <SafeAreaView style={{ flex: 1, width: "100%" }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            ...styles.container,
                            flex: 1,
                            justifyContent: "flex-end",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 36,
                                fontWeight: 600,
                                color: "white",
                                marginBottom: 64,
                            }}
                        >
                            Send {type === "sms" ? "SMS" : "Email"}
                        </Text>
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={{
                                    ...styles.button,
                                    marginHorizontal: 5,
                                }}
                                onPress={importContactsHandler}
                            >
                                <Text style={{ fontSize: 18 }}>
                                    Import Contacts
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    ...styles.button,
                                    marginHorizontal: 5,
                                }}
                                onPress={switchType}
                            >
                                <Text style={{ fontSize: 18 }}>
                                    Switch Type
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {type === "email" ? (
                            <MultipleSelectList
                                boxStyles={{
                                    ...styles.contactDropdown,
                                }}
                                maxHeight={250}
                                setSelected={(val) => setSelectedContacts(val)}
                                data={listDataEmail}
                                label="Contacts"
                                notFoundText="No contacts have been imported"
                                search={false}
                                save="key"
                                dropdownStyles={{
                                    backgroundColor: "white",
                                    maxWidth: 335,
                                }}
                            />
                        ) : (
                            <View style={{ flex: 3.5 }} />
                        )}
                        {type === "email" ? (
                            <TextInput
                                style={styles.textInput}
                                placeholder="Subject"
                                keyboardType="default"
                                value={subject}
                                onChangeText={(text) => setSubject(text)}
                            />
                        ) : (
                            <MultipleSelectList
                                boxStyles={{
                                    ...styles.contactDropdown,
                                }}
                                maxHeight={250}
                                setSelected={(val) => setSelectedContacts(val)}
                                data={listDataPhoneNumber}
                                label="Contacts"
                                notFoundText="No contacts have been imported"
                                search={false}
                                save="key"
                                dropdownStyles={{
                                    backgroundColor: "white",
                                    maxWidth: 335,
                                }}
                            />
                        )}
                        <TextInput
                            style={
                                Platform.OS === "ios"
                                    ? styles.textInputBodyIOS
                                    : styles.textInputBodyAndroid
                            }
                            placeholder="Body"
                            numberOfLines={9}
                            multiline={true}
                            keyboardType="default"
                            value={body}
                            onChangeText={(text) => setBody(text)}
                        />
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={{
                                    ...styles.button,
                                    marginHorizontal: 5,
                                }}
                                onPress={resetFields}
                            >
                                <Text style={{ fontSize: 20 }}>
                                    Reset Fields
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    ...styles.button,
                                    marginHorizontal: 5,
                                }}
                                onPress={() => {
                                    Alert.alert("", "Are you sure?", [
                                        {
                                            text: "Yes",
                                            onPress: () => {
                                                type === "sms"
                                                    ? sendMessageWithSMS()
                                                    : sendMessageWithEmail();
                                                resetFields();
                                            },
                                        },
                                        { text: "No", onPress: () => {} },
                                    ]);
                                }}
                            >
                                <Text style={{ fontSize: 20 }}>Send</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }} />
                        <View style={{ width: "100%" }}>
                            <NavigationFooterBar />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default Message;
