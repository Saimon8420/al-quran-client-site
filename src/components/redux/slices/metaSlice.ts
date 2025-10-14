import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SectionReference {
  surah: number;
  ayah: number;
  // for sajdas
  recommended?: boolean;
  obligatory?: boolean;
}
interface EachSection {
  count: number;
  reference: SectionReference[];
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
    references: Array<{
      number: number;
      name: string;
      englishName: string;
      englishNameTranslation: string;
      numberOfAyahs: number;
      revelationType: string;
    }>;
  };
  ayahs: {
    count: number;
  };
}

const initialState: MetaState = {
  tabList: [],
  hizbQuarters: { count: 0, reference: [] },
  juzs: { count: 0, reference: [] },
  manzils: { count: 0, reference: [] },
  rukus: { count: 0, reference: [] },
  pages: { count: 0, reference: [] },
  sajdas: { count: 0, reference: [] },
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
