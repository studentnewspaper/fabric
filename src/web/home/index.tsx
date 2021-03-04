import { FunctionComponent } from "preact";
import ArticleCell from "../components/ArticleCell";
import Block from "../components/Block";
import Container from "../components/Container";
import Header from "../components/Header";

export interface HomePageProps {}

const Wrapper: FunctionComponent<{ cols: number }> = ({ cols, children }) => {
  return <div style={{ gridColumn: `auto / span ${cols}` }}>{children}</div>;
};

const HomePage: FunctionComponent<HomePageProps> = ({}) => {
  return (
    <>
      <Header />
      <Container grid={1}>
        <Block columns={6}>
          <Wrapper cols={4}>
            <ArticleCell
              title="Student Elections 2021"
              text="The time has come again to elect those which we want to represent our interests during the next year. Voting opens 8th March."
            />
          </Wrapper>
          <Wrapper cols={2}>
            <ArticleCell
              title="Your candidates"
              text="All the candidates standing for election can be found on the EUSA site."
            />
          </Wrapper>
        </Block>
      </Container>
    </>
  );
};

export default HomePage;
