import * as React from "react";
import DetailPage from "../../stories/screens/DetailPage";
export interface Props {
	navigation: any,
}
export interface State {}
export default class DetailPageContainer extends React.Component<Props, State> {
	render() {
		return <DetailPage navigation={this.props.navigation} />;
	}
}
