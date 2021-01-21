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
  Right,
  Body,
} from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addFavItem } from '../../../container/HomeContainer/actions';

import styles from './styles';

export interface Props {
  navigation: any;
  addFavItem: any;
}
export interface State {}
class DetailPage extends React.Component<Props, State> {
  render() {
    const param = this.props.navigation.state.params;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body style={{ flex: 3 }}>
            <Title>{param ? param.title : 'Blank Page'}</Title>
          </Body>

          <Right />
        </Header>

        <Content
          padder
          contentContainerStyle={{
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Title </Text>
          <Text>
            {param !== undefined
              ? param.title.toLowerCase()
              : 'Create Something Awesome . . .'}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>Description: </Text>
          <Text>
            {param !== undefined
              ? param.description
              : 'Create Something Awesome . . .'}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>Image</Text>
          <Image
            accessibilityLabel="image"
            style={{ width: 100, height: 100 }}
            source={{ uri: param.image }}
          />
          <Text style={{ fontWeight: 'bold' }}>Favourite</Text>
          <TouchableOpacity
            onPress={() => this.props.addFavItem({ id: param.id })}
          >
            <Icon
              active
              style={{
                color:
                  this.props.data.length > 0 &&
                  this.props.data.some((i) => i.id === param.id)
                    ? 'orange'
                    : 'black',
              }}
              name="star"
            />
          </TouchableOpacity>
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

export default connect(mapStateToProps, bindAction)(DetailPage);
