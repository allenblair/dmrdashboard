import React from 'react';
import favoriteTGs from './favoriteTGs';

export default class FavoriteTGStatus extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            baseurl: 'https://brandmeister.network/?page=lh&jsonquery=',
            jsonquery: {},
            favoriteTGs: favoriteTGs,
            fullUrl: ""
        }
        this.buildTalkgroupRule = this.buildTalkgroupRule.bind(this);
    }

    buildTalkgroupRule(tgId){
        return {"id":"DestinationID","field":"DestinationID","type":"integer","input":"text","operator":"equal","value":tgId};
    }

    componentDidMount(){
        let temp = [];
        this.state.favoriteTGs.forEach(item => {
            temp.push(this.buildTalkgroupRule(item.ID));
        });
        const jsonquery = {
            "condition":"OR",
            "rules":temp
        };
        console.log(this.state.baseurl + JSON.stringify(jsonquery));
        this.setState({
            fullUrl: this.state.baseurl + JSON.stringify(jsonquery)
        });
    }

    render(){
        return (
            <div><a href={this.state.fullUrl} target="_blank">Last Heard for All Favorites</a></div>
        );
    };
};