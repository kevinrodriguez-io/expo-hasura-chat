import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Alert,
  FlatList
} from "react-native";
import { useSubscription, useMutation } from "@apollo/react-hooks";

import { INSERT_MESSAGE } from "../lib/graphql/messages/mutations";
import { SUBSCRIBE_MESSAGES } from "../lib/graphql/messages/subscriptions";

export default function Main() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const { loading, data, error } = useSubscription(SUBSCRIBE_MESSAGES);
  const [insertMessageMutation] = useMutation(INSERT_MESSAGE);

  const handleSendPress = async () => {
    if (!username) {
      Alert.alert("El nombre de usuario es requerido!");
      return;
    }
    if (!message) {
      Alert.alert("El mensaje es requerido!");
      return;
    }
    setSendingMessage(true);
    try {
      await insertMessageMutation({
        variables: {
          objects: [
            {
              content: message,
              created_by: username
            }
          ]
        }
      });
    } catch (error) {
      Alert.alert("Ha ocurrido un error al crear");
    } finally {
      setSendingMessage(false);
    }
  };

  const renderMessages = (data, loading, error) => {
    if (loading || error) return <View />;
    return (
      <View style={{ height: 250 }}>
        <FlatList
          data={data.messages}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.messageTile}>
              <Text>{`${item.created_by} dice: ${item.content}`}</Text>
            </View>
          )}
        />
      </View>
    );
  };
  console.log({ username });
  return (
    <>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          onChangeText={text => setUsername(text)}
          style={styles.input}
          placeholder="Nombre de usuario"
        />
        <View style={styles.itemContainer}>
          <Text>Insertar mensaje</Text>
          <TextInput
            onChangeText={text => setMessage(text)}
            style={styles.input}
            placeholder="Mensaje"
          />
          <View style={styles.buttonContainer}>
            <Button
              disabled={sendingMessage}
              onPress={handleSendPress}
              color="#5B48A2"
              title={sendingMessage ? "Enviando" : "Enviar"}
            />
          </View>
          <View style={styles.divider} />
        </View>
        <View style={styles.itemContainer}>
          <Text>Mensajes: {loading ? "cargando" : "cargados"}</Text>
          {renderMessages(data, loading, error)}
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  messageTile: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    alignItems: "center"
  },
  divider: {
    height: 1,
    width: 250,
    backgroundColor: "#5B48A2"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    marginVertical: 15
  },
  itemContainer: {
    marginTop: 15
  },
  input: {
    width: 250,
    height: 45,
    borderBottomWidth: 1,
    alignSelf: "center",
    borderBottomColor: "#5B48A2",
    color: "#000"
  }
});
