import * as React from "react";
import { connect } from "react-redux";
import Home from "../../stories/screens/Home";
import { fetchList } from "./actions";
export interface Props {
	navigation: any;
	fetchList: Function;
	data: Object;
}
export interface State {}
class HomeContainer extends React.Component<Props, State> {

  async componentDidMount() {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=football+gosling&api_key=iw8kzwUHGNSt9z4C1V5DRGRwf71QVlTt&limit=10`
      );
      const json = await response.json();
      this.props.fetchList(json.data);
    } catch (error) {
      console.log(error);
    }
  }

	render() {
		return <Home navigation={this.props.navigation} list={this.props.data} />;
	}
}

function bindAction(dispatch) {
	return {
		fetchList: url => dispatch(fetchList(url)),
	};
}

const mapStateToProps = state => ({
	data: state.homeReducer.list,
	isLoading: state.homeReducer.isLoading,
});
export default connect(mapStateToProps, bindAction)(HomeContainer);
