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
    <>
      {edition.name} | '{edition.language}'
    </>
  );

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="flex items-center justify-center gap-4">
        <div className="">
          <h3 className="text-lg font-semibold">Arabic Text</h3>
          <CustomSelect
            data={editions.arabicTextFormat}
            placeholder="Select arabic text"
            label="Arabic text"
            renderOption={renderArabicTextOption}
            type={"arabicText"}
            defaultValue={editions.userSelect.arabicText}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold">Translation 1</h3>
          <CustomSelect
            data={editions.translationTextFormat}
            placeholder="Select translation 1"
            label="Translation 1"
            renderOption={renderTranslationOption}
            type={"translation1"}
            defaultValue={editions.userSelect.translation1}
          />
        </div>

        <div className="">
          <h3 className="text-lg font-semibold">Translation 2</h3>
          <CustomSelect
            data={editions.translationTextFormat}
            placeholder="Select translation 2"
            label="Translation 2"
            renderOption={renderTranslationOption}
            type={"translation2"}
            defaultValue={editions.userSelect.translation2}
          />
        </div>

        <div className="">
          <h3 className="text-lg font-semibold">Audio</h3>
          <CustomSelect
            data={editions.audioFormat}
            placeholder="Select audio"
            label="Audio"
            renderOption={renderAudioOption}
            type={"audio"}
            defaultValue={editions.userSelect.audio}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingDefault;
