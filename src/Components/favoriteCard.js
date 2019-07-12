import React from 'react';
import { Badge, Card, CardBody, CardText, CardTitle, Col, Row, Table } from 'reactstrap';

const FavoritesCard = props => {

    let temp = [];
    props.category.forEach(item => {
        temp.push(props.buildTalkgroupRule(item.ID));
    });
    const jsonquery = {
        "condition":"OR",
        "rules":temp
    };
    return (
        <Card body>
            <CardTitle>{props.title}</CardTitle>
            <CardBody>
                <Table size="sm">
                    <tbody>
                        {props.category.map(item => {
                            return (
                                <tr><td>{item.ID}</td><td><a href={props.urlroot + item.ID + '%22}]}'} target="_blank">{item.name}</a>{item.static ? <Badge color="primary" style={{marginLeft:5}}>Static</Badge> : ""}</td></tr>
                            )
                        })}
                    </tbody>
                </Table>
                <p><a href={props.baseurl + JSON.stringify(jsonquery)} target="_blank">Last Heard for All {props.title}</a></p>
                
            </CardBody>
        </Card>        
    )
}

export default FavoritesCard;