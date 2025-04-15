import {
  Input,
  Image,
  InputGroup,
  Grid,
  GridItem,
  Center,
  Field,
  Button,
} from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";
import logo from "@/assets/images/logo.svg";
import SelectCountry from "./SelectCountry";
import { useForm } from "react-hook-form";
import { searchForm } from "@/types";

type Props = {
  onSubmit: (data: searchForm) => void;
};

function Header({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<searchForm>();

  return (
    <Grid templateColumns="repeat(6, 1fr)">
      <GridItem>
        <Image src={logo} alt="logo image" />
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
            <Field.Root invalid={!!errors.search}>
              <InputGroup startElement={<RiSearchLine />}>
                <Input
                  {...register("search", { required: true })}
                  color="gray.600"
                  colorPalette="orange"
                  placeholder="Search..."
                  _placeholder={{ color: "gray.600" }}
                />
              </InputGroup>
              <Field.ErrorText>This field is required</Field.ErrorText>
            </Field.Root>
            <Button variant="solid" bgColor="orange.600" type="submit">
              Buscar
            </Button>
          </form>
        </Center>
      </GridItem>
      <GridItem colSpan={1}>
        <SelectCountry />
      </GridItem>
    </Grid>
  );
}

export default Header;
