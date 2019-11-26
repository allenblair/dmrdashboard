import React from 'react';
import favoriteTGs from './favoriteTGs';
import repeaters from './repeaters';
import FavoritesCard from './favoriteCard';
import { Card, CardBody, CardTitle, Row, Table } from 'reactstrap';

export default class FavoriteTGStatus extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            baseurl: 'https://brandmeister.network/?page=lh&jsonquery=',
            jsonquery: {},
            staticQuery: {},
            statesQuery: {},
            favoriteTGs: favoriteTGs,
            fullUrl: "",
            staticUrl: "",
            statesUrl: ""
        }
        this.buildTalkgroupRule = this.buildTalkgroupRule.bind(this);
    }

    buildTalkgroupRule(tgId){
        return {"id":"DestinationID","field":"DestinationID","type":"integer","input":"text","operator":"equal","value":tgId};
    }

    componentDidMount(){
        let temp = [];
        let statics = [];
        let states = [];
        this.state.favoriteTGs.forEach(item => {
            if (item.category !== "International" && (item.ID < 310 || item.ID > 319)) {temp.push(this.buildTalkgroupRule(item.ID))}
            if (item.static) {statics.push(this.buildTalkgroupRule(item.ID))}
        });
        let i;
        let swExclude = [3103,3107,3114,3143,3152];
        for (i=3101;i<=3147;i++){
            if(!swExclude.includes(i)){
                states.push(this.buildTalkgroupRule(i));
            }
        }
        const jsonquery = {
            "condition":"OR",
            "rules":temp
        };
        const staticQuery = {
            "condition":"OR",
            "rules": statics
        }
        const statesQuery = {
            "condition":"OR",
            "rules": states
        }
        console.log(this.state.baseurl + JSON.stringify(jsonquery));
        this.setState({
            fullUrl: this.state.baseurl + JSON.stringify(jsonquery),
            staticUrl: this.state.baseurl + JSON.stringify(staticQuery),
            statesUrl: this.state.baseurl + JSON.stringify(statesQuery)
        });
    }

    render(){
        const urlroot = 'https://brandmeister.network/?page=lh&jsonquery={%22condition%22%3A%22OR%22%2C%22rules%22%3A[{%22id%22%3A%22DestinationID%22%2C%22field%22%3A%22DestinationID%22%2C%22type%22%3A%22integer%22%2C%22input%22%3A%22text%22%2C%22operator%22%3A%22equal%22%2C%22value%22%3A%22';
        const categories = ["Alabama","National","States","Regional","International","Cities","Other/Topics","Personal TG"];
        return (
            <>
                <h5 className="text-center">
                    <a href={this.state.fullUrl} target="_blank">Last Heard for Main Favorites</a>
                    &nbsp;|&nbsp;
                    <a href={this.state.staticUrl} target="_blank">Last Heard for Statics</a> 
                </h5>
                <h5 className="text-center">
                    <a href={this.state.statesUrl} target="_blank">Last Heard for All US Statewides</a>
                </h5>
                <Row>
                    <Card body style={{maxWidth:400}}>
                        <CardTitle>Repeaters</CardTitle>
                        <CardBody>
                            <Table size="sm">
                                <tbody>
                                    {repeaters.map(item => {
                                        return (
                                            <tr>
                                                <td>{item.call + ' - ' + item.name}</td>
                                                <td><a href={'https://brandmeister.network/?page=repeater&id=' + item.ID} target="_blank">Home</a></td>
                                                <td><a href={'https://brandmeister.network/?page=lh&ContextID=^' + item.ID + '$'} target="_blank">LH</a></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            
                        </CardBody>
                    </Card> 
                    {categories.map(category => {
                        return (
                                <FavoritesCard style={{maxWidth:400}}
                                    category={this.state.favoriteTGs.filter(item => item.category === category)}
                                    urlroot={urlroot}
                                    title={category}
                                    buildTalkgroupRule={this.buildTalkgroupRule}
                                    baseurl={this.state.baseurl} />
                        )
                    })}
                </Row>
            </>
        );
    };
};