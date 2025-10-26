import type { RootState } from "@/app/store";
import { useGetEditionsDataQuery } from "@/components/redux/api/metaDataApi";
import CustomSelect from "@/components/ui/custom-select/custom-select";
import { useSelector } from "react-redux";
import type { Editions } from "@/components/redux/api/metaDataApi";

const SettingDefault = () => {
  useGetEditionsDataQuery();

  const editions = useSelector((state: RootState) => state?.edition);

  const renderArabicTextOption = (edition: Editions) => (
    <>
      {edition.englishName} | '{edition.language}'
    </>
  );

  const renderAudioOption = (edition: Editions) => (
    <>
      {edition.englishName} | '{edition.language}'
    </>
  );

  const renderTranslationOption = (edition: Editions) => (
    <div className="mb-4">
      {edition.name} | '{edition.language}'
    </div>
  );
  console.log(editions.userSelect);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="flex items-center justify-center gap-4">
        <div className="">
          <h3 className="text-lg font-semibold">Arabic Text</h3>
          <CustomSelect
            data={editions.arabicTextFormat}
            placeholder="Select translation"
            label="Translations"
            renderOption={renderArabicTextOption}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold">Translation 1</h3>
          <CustomSelect
            data={editions.translationTextFormat}
            placeholder="Select translation"
            label="Translations"
            renderOption={renderTranslationOption}
          />
        </div>

        <div className="">
          <h3 className="text-lg font-semibold">Translation 2</h3>
          <CustomSelect
            data={editions.translationTextFormat}
            placeholder="Select translation"
            label="Translations"
            renderOption={renderTranslationOption}
          />
        </div>

        <div className="">
          <h3 className="text-lg font-semibold">Audio</h3>
          <CustomSelect
            data={editions.audioFormat}
            placeholder="Select audio"
            label="Audio"
            renderOption={renderAudioOption}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingDefault;
