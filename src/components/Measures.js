import React from "react";
import {Container, Row, Table} from "react-bootstrap";
import Divider from "./Divider";

const Measures = (props) => {
    return (
        <Container>
            <Row>
                <h2>Measures</h2>
            </Row>
            <Divider/>
            <div className={'table-responsive'}>
                <Table striped>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Weight</th>
                        <th>Body Fat %</th>
                        <th>Lean Body Weight</th>
                        <th>Body Fat</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.measures.map((measure) => {
                        return (
                          <tr key={measure._id}>
                              <td>{measure.date}</td>
                              <td>{measure.weight}</td>
                              <td>{measure.bodyFatPercentage}</td>
                              <td>{measure.leanBodyWeight}</td>
                              <td>{measure.bodyFat}</td>
                              <td>{measure.bodyType}</td>
                          </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default Measures;