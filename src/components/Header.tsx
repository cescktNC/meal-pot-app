import {
  Input,
  Image,
  InputGroup,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";
import logo from "@/assets/images/logo.svg";
import SelectCountry from "./SelectCountry";

type Props = {};

function Header({}: Props) {
  return (
    <Grid templateColumns="repeat(6, 1fr)">
      <GridItem>
        <Image src={logo} alt="logo image" />
      </GridItem>
      <GridItem colSpan={4}>
        <Center>
          <InputGroup maxW="80%" startElement={<RiSearchLine />}>
            <Input
              color="gray.600"
              colorPalette="orange"
              placeholder="Search..."
              _placeholder={{ color: "gray.600" }}
            />
          </InputGroup>
        </Center>
      </GridItem>
      <GridItem colSpan={1}>
        <SelectCountry />
      </GridItem>
    </Grid>
  );
}

export default Header;
