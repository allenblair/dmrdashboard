import React from 'react';
import { Badge, Card, CardBody, CardTitle, Table } from 'reactstrap';

const RepeaterList = props => {

    return (
        <Card body style={{maxWidth:400}}>
            <CardTitle>{props.title}</CardTitle>
            <CardBody>
                <Table size="sm">
                    <tbody>
                        {props.list.map(item => {
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
    )
}

export default RepeaterList;
