import * as React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Right,
} from 'native-base';
import { connect } from 'react-redux';

import styles from './styles';
import { TouchableOpacity, View } from 'react-native';
import { addFavItem } from '../../../container/HomeContainer/actions';

export interface Props {
  navigation: any;
  list: any;
}
export interface State {}
class Home extends React.Component<Props, State> {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                active
                name="menu"
                onPress={() => this.props.navigation.navigate('DrawerOpen')}
              />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            {this.props.list.map((item, i) => (
              <ListItem
                icon
                key={item.id}
                onPress={() =>
                  this.props.navigation.navigate('DetailPage', {
                    image: item.images.downsized.url,
                    title: item.title,
                    id: item.id,
                    description: item.slug,
                  })
                }
              >
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Text>{item.title}</Text>
                  <TouchableOpacity
                    onPress={() => this.props.addFavItem({ id: item.id })}
                  >
                    <Icon
                      active
                      style={{
                        color:
                          this.props.data.length > 0 &&
                          this.props.data.some((i) => i.id === item.id)
                            ? 'orange'
                            : 'black',
                      }}
                      name="star"
                    />
                  </TouchableOpacity>
                </View>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    addFavItem: (favItem) => dispatch(addFavItem(favItem)),
  };
}

const mapStateToProps = (state) => ({
  data: state.homeReducer.favList,
  // isLoading: state.homeReducer.isLoading,
});

export default connect(mapStateToProps, bindAction)(Home);
