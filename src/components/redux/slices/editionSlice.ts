import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Editions } from "../api/metaDataApi";

export interface EditionState {
  audioFormat: Editions[];
  tafsirTextFormat: Editions[];
  translationTextFormat: Editions[];
  arabicTextFormat: Editions[];
  userSelect: {
    arabicText: string;
    translation1: string;
    translation2: string;
    audio: string;
  };
  userSingleSelect: {
    text: string;
  };
}

const editionState: EditionState = {
  audioFormat: [],
  tafsirTextFormat: [],
  translationTextFormat: [],
  arabicTextFormat: [],
  // for surahs,sajdas,rukus
  userSelect: {
    arabicText: "quran-simple",
    translation1: "en.sahih",
    translation2: "bn.bengali",
    audio: "ar.abdurrahmaansudais",
  },
  // for pages,manzils,juzs,hizbs
  userSingleSelect: {
    text: "quran-simple",
  },
};

export const editionSlice = createSlice({
  name: "editionSlice",
  initialState: editionState,
  reducers: {
    setEditionData: (
      state,
      action: PayloadAction<{
        audioFormat: Editions[];
        tafsirTextFormat: Editions[];
        translationTextFormat: Editions[];
        arabicTextFormat: Editions[];
      }>
    ) => {
      state.audioFormat = action.payload.audioFormat;
      state.translationTextFormat = action.payload.translationTextFormat;
      state.tafsirTextFormat = action.payload.tafsirTextFormat;
      state.arabicTextFormat = action.payload.arabicTextFormat;
    },

    // for surahs,sajdas,rukus
    setUserSelect: (
      state,
      action: PayloadAction<{
        type: keyof EditionState["userSelect"];
        value: string;
      }>
    ) => {
      state.userSelect[action.payload.type] = action.payload.value;
    },

    // for pages,manzils,juzs,hizbs
    setUserSingleSelect: (
      state,
      action: PayloadAction<{
        type: keyof EditionState["userSingleSelect"];
        value: string;
      }>
    ) => {
      state.userSingleSelect[action.payload.type] = action.payload.value;
    },
  },
});

export const { setEditionData, setUserSelect, setUserSingleSelect } =
  editionSlice.actions;

export default editionSlice.reducer;
