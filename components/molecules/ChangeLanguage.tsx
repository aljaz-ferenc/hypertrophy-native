import { HStack, Text, View, VStack } from "native-base";
import { FlatList, StyleSheet } from "react-native";
import Button from "../atoms/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GB, SI } from "country-flag-icons/react/1x1";
import CountryFlag from "react-native-country-flag";
import { Colors } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import Heading from "../atoms/Heading";
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';


const languages = [
  {
    language: "si",
    isoCode: "si",
    label: "SLO",
  },
  {
    language: "en",
    isoCode: "gb",
    label: "ENG",
  },
];

export default function ChangeLanguage() {
  const { i18n, t } = useTranslation();
  const {setItem} = useAsyncStorage('hypertrophyLng')

  const changeLanguage = async (lng: string) => {

    try{
      i18n.changeLanguage(lng)
      await setItem(lng)
    }catch(err){
      if(err instanceof Error){
        return console.error(err.message)
      }
      console.error(err)
    }
  }

  return (
    <View>
      <Heading modifier="h3">{t('SETTINGS.language.title')}</Heading>
      <FlatList
        contentContainerStyle={styles.container}
        horizontal
        data={languages}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => changeLanguage(item.language)} style={[styles.lngButton, i18n.language === item.language && styles.active]}>
              <CountryFlag style={styles.flagIcon} isoCode={item.isoCode} size={25} />
              <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: 'row',
    flex: 1,
    padding: 25
  },
  lngButton: {
    backgroundColor: Colors.secondary,
    padding: 15,
    gap: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  flagIcon: {
    borderColor: Colors.border,
    borderRadius: 3
  },
  label: {
    color: Colors.white,
    textAlign: 'center'
  },
  active: {
    backgroundColor: Colors.primary
  }
});
