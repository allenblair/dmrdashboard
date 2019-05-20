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
        const urlroot = 'https://brandmeister.network/?page=lh&jsonquery={%22condition%22%3A%22OR%22%2C%22rules%22%3A[{%22id%22%3A%22DestinationID%22%2C%22field%22%3A%22DestinationID%22%2C%22type%22%3A%22integer%22%2C%22input%22%3A%22text%22%2C%22operator%22%3A%22equal%22%2C%22value%22%3A%22';
        return (
            <>
                <ul style={{listStyleType:"none"}}>
                    {this.state.favoriteTGs.map(item => {
                        return (
                            <li><a href={urlroot + item.ID + '%22}]}'} target="_blank" style={{color:'white'}}>{item.ID} - {item.name}</a></li>
                        )
                    })}
                </ul>
                <a href={this.state.fullUrl} target="_blank" style={{color:'white'}}>Last Heard for All Favorites</a>
            </>
        );
    };
};