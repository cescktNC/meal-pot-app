import {
  Input,
  Image,
  InputGroup,
  Grid,
  GridItem,
  Center,
  Button,
} from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";
import logo from "@/assets/images/logo.svg";
import SelectCountry from "./SelectCountry";
import { useForm } from "react-hook-form";
import { SearchForm } from "@/types";
import { useContext } from "react";
import CategoryAndLetterContext from "../contexts/CategoryAndLetterContext";

type Props = {
  form: ReturnType<typeof useForm<SearchForm>>;
  onSubmit: (data: SearchForm) => void;
  onChange: (area: string) => void;
};

function Header({ form, onSubmit, onChange }: Props) {
  const { register, handleSubmit } = form;
  const { updateSearchFilters } = useContext(CategoryAndLetterContext);

  return (
    <Grid templateColumns="repeat(6, 1fr)">
      <GridItem>
        <Image
          src={logo}
          alt="logo image"
          _hover={{ cursor: "pointer" }}
          onClick={() =>
            updateSearchFilters({ category: { strCategory: "Beef" } })
          }
        />
      </GridItem>
      <GridItem colSpan={4}>
        <Center>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              gap: "1rem",
              width: "80%",
            }}
          >
            <InputGroup startElement={<RiSearchLine />}>
              <Input
                {...register("search")}
                color="gray.600"
                colorPalette="orange"
                placeholder="Search..."
                _placeholder={{ color: "gray.600" }}
              />
            </InputGroup>
            <Button variant="solid" bgColor="orange.solid" type="submit">
              Search
            </Button>
          </form>
        </Center>
      </GridItem>
      <GridItem colSpan={1}>
        <SelectCountry onChange={onChange} />
      </GridItem>
    </Grid>
  );
}

export default Header;
