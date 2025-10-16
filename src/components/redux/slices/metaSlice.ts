import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface SectionReference {
  surah: number;
  ayah: number;
  // for sajdas
  recommended?: boolean;
  obligatory?: boolean;
}
interface EachSection {
  count: number;
  references: SectionReference[];
}
interface MetaState {
  tabList: string[];
  hizbQuarters: EachSection;
  juzs: EachSection;
  manzils: EachSection;
  rukus: EachSection;
  pages: EachSection;
  sajdas: EachSection;
  surahs: {
    count: number;
    references: Surah[];
  };
  ayahs: {
    count: number;
  };
}

const initialState: MetaState = {
  tabList: [],
  hizbQuarters: { count: 0, references: [] },
  juzs: { count: 0, references: [] },
  manzils: { count: 0, references: [] },
  rukus: { count: 0, references: [] },
  pages: { count: 0, references: [] },
  sajdas: { count: 0, references: [] },
  surahs: { count: 0, references: [] },
  ayahs: { count: 0 },
};

export const metaSlice = createSlice({
  name: "metaSlice",
  initialState: initialState,
  reducers: {
    setTabList: (state, action: PayloadAction<string[]>) => {
      state.tabList = action.payload;
    },
    setMetaData: (state, action: PayloadAction<Partial<MetaState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setTabList, setMetaData } = metaSlice.actions;

export default metaSlice.reducer;
