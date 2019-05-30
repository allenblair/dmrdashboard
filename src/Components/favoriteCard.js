import React from 'react';
import { Card, CardBody, CardText, CardTitle, Col, Row, Table } from 'reactstrap';

const FavoritesCard = props => {
    return (
        <Card body>
            <CardTitle>{props.title}</CardTitle>
            <CardBody>
                <Table size="sm">
                    <tbody>
                        {props.category.map(item => {
                            return (
                                <tr><td>{item.ID}</td><td><a href={props.urlroot + item.ID + '%22}]}'} target="_blank">{item.name}</a></td></tr>
                            )
                        })}
                    </tbody>
                </Table>
                
            </CardBody>
        </Card>        
    )
}

export default FavoritesCard;