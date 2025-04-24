import {
  createListCollection,
  HStack,
  Select,
  useSelectContext,
} from "@chakra-ui/react";
import { useContext } from "react";
import CategoryAndLetterContext from "./contexts/CategoryAndLetterContext";

const areaToFlagCode: Record<string, string> = {
  "Select the country": "xx",
  American: "us",
  British: "gb",
  Canadian: "ca",
  Chinese: "cn",
  Croatian: "hr",
  Dutch: "nl",
  Egyptian: "eg",
  Filipino: "ph",
  French: "fr",
  Greek: "gr",
  Indian: "in",
  Irish: "ie",
  Italian: "it",
  Jamaican: "jm",
  Japanese: "jp",
  Kenyan: "ke",
  Malaysian: "my",
  Mexican: "mx",
  Moroccan: "ma",
  Polish: "pl",
  Portuguese: "pt",
  Russian: "ru",
  Spanish: "es",
  Thai: "th",
  Tunisian: "tn",
  Turkish: "tr",
  Ukrainian: "ua",
  Uruguayan: "uy",
  Vietnamese: "vn",
};

// This is a list of countries and their corresponding flag codes.
const areas = Object.entries(areaToFlagCode).map(([area, code]) => ({
  name: area,
  id: code,
}));

// This is a collection of countries that will be used in the select component.
const countries = createListCollection({
  items: areas,
  itemToString: (item) => item.name,
  itemToValue: (item) => item.id,
});

// This is a component that displays the flag icon for the selected country.
const FlagIcon = ({ code }: { code: string }) => (
  <span className={`fi fi-${code}`}></span>
);

// This is a component that displays the selected value in the select component.
const SelectValue = () => {
  const select = useSelectContext();
  const items = select.selectedItems as Array<{
    name: string;
    id: string;
  }>;
  const { name, id } = items[0];

  return (
    <Select.ValueText>
      <HStack>
        {id !== "xx" && <FlagIcon code={id} />}
        {name}
      </HStack>
    </Select.ValueText>
  );
};

type Props = { onChange: (area: string) => void };

function SelectCountry({ onChange }: Props) {
  const { selectedArea } = useContext(CategoryAndLetterContext);
  return (
    <Select.Root
      collection={countries}
      value={[areaToFlagCode[selectedArea]]}
      positioning={{ sameWidth: true }}
      onValueChange={(value) => onChange(value.items[0].name)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <SelectValue />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {countries.items.map((item) => (
            <Select.Item item={item} key={item.id} justifyContent="flex-start">
              {item.id !== "xx" && <FlagIcon code={item.id} />}
              {item.name}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}

export default SelectCountry;
