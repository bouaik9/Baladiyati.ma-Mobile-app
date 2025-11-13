import { KeyboardTypeOptions, TextInput } from "react-native";
import { StyleSheet } from 'react-native';

type Props = {
    placeholder: string;
    keyboardType: KeyboardTypeOptions;
    autoCapitalize: "none" | "sentences" | "words" | "characters";
    secureTextEntry?: boolean;
    value: string; // Add this
    onChangeText: (text: string) => void; // Add this
};

export default function Input({
                                  placeholder,
                                  keyboardType,
                                  autoCapitalize,
                                  secureTextEntry,
                                  value, // Add this
                                  onChangeText // Add this
                              }: Props) {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            value={value} // Add this
            onChangeText={onChangeText} // Add this
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: '86%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: 'white',
    },
});