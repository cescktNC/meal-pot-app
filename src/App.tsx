import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";

function App() {
  return (
    <Grid templateColumns="repeat(5, 1fr)">
      <GridItem h="80px" colSpan={5} bg={"blue.500"}>
        <Header />
      </GridItem>
      <GridItem h="calc(100vh - 80px)" bg={"red.500"}>
        <SideNav />
      </GridItem>
      <GridItem colSpan={4} bg={"green.500"}>
        <MainContent />
      </GridItem>
    </Grid>
  );
}

export default App;
