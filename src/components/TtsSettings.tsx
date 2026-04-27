import { getAvailableVoicesAsync, speak } from "expo-speech";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ToggleInputField from "./ToggleInputField";
import SelectInputField from "./SelectInputField";

type TtsVoice = {
  language: string;
  region: string;
  name: string;
  isSelected: boolean;
};

export default function TtsSettings() {
  const [voices, setVoices] = useState<TtsVoice[]>([]);
  const [filteredVoices, setFilteredVoices] = useState<TtsVoice[]>([]);
  const [languages, setLanguages] = useState<Set<string>>(new Set());
  const [selectedLanguage, setSelectedLanguage] = useState<string>("--");
  const [regions, setRegions] = useState<Set<string>>(new Set());
  const [regionOptions, setRegionOptions] = useState<Set<string>>(new Set());
  const [selectedRegion, setSelectedRegion] = useState<string>("--");

  useEffect(() => {
    (async () => {
      const availableVoices = await getAvailableVoicesAsync();
      const languages = new Set<string>();
      const regions = new Set<string>();
      const regionOptions = new Set<string>();
      const voices = new Array<TtsVoice>();

      availableVoices.forEach(voice => {
        const language = voice.language.split("-");
        languages.add(language[0]);
        regions.add(language[1]);
        voices.push({ language: language[0], region: language[1], name: voice.name, isSelected: false });

        if (language[0] === selectedLanguage) regionOptions.add(language[1]);
      });

      setLanguages(languages);
      setRegions(regions);
      setRegionOptions(regionOptions);
      setVoices(voices);
    })();
  }, []);

  function onVoiceSelect(name: string) {
    speak("Hello World!", { voice: name });
    setVoices(prev =>
      prev.map(voice => {
        if (voice.name === name) voice.isSelected = true;
        else voice.isSelected = false;

        return voice;
      })
    );
  }

  function onLanguageSelection(language: string) {
    const validRegions = new Set<string>();
    let region = "";

    voices.forEach(voice => {
      if (voice.language === language) {
        validRegions.add(voice.region);
        region = voice.region;
      }
    });

    setRegionOptions(validRegions);
    setSelectedLanguage(language);
    setSelectedRegion(region);
    filterVoices(language, region);
  }

  function onRegionSelection(region: string) {
    setSelectedRegion(region);
    filterVoices(selectedLanguage, region);
  }

  function filterVoices(language: string, region: string) {
    const filteredVoices = voices.filter(voice =>
      voice.language === language && voice.region === region
    );

    setFilteredVoices(filteredVoices);
  }

  return (
    <View style={{ paddingInline: 12, gap: 12, paddingBottom: 24 }}>
      <Text style={{ color: "white", fontFamily: "RobotoMono", fontSize: 24, paddingBottom: 12 }}>
        Text to Speech
      </Text>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <SelectInputField
          value={selectedLanguage}
          options={Array.from(languages)}
          action={onLanguageSelection}
        />
        <SelectInputField
          value={selectedRegion}
          options={Array.from(regionOptions)}
          action={onRegionSelection}
        />
      </View>
      {filteredVoices.map((voice, index) =>
        <View
          key={index}
          style={{ flexDirection: "row", justifyContent: "space-between", paddingInline: 12 }}
        >
          <Text style={{ color: "white", fontFamily: "RobotoMono" }}>{voice.name}</Text>
          <ToggleInputField name={voice.name} value={voice.isSelected} action={onVoiceSelect} />
        </View>
      )}
    </View>
  );
}

