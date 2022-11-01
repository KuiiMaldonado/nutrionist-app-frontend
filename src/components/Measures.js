import React from "react";
import {Table} from "react-bootstrap";

const Measures = () => {
    return (
        <>
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
                    <tr>
                        <td>10/07/2022</td>
                        <td>74.80</td>
                        <td>21.11%</td>
                        <td>59.01</td>
                        <td>15.79</td>
                        <td>Durnin</td>
                    </tr>
                    <tr>
                        <td>09/09/2022</td>
                        <td>75.80</td>
                        <td>17.86%</td>
                        <td>62.26</td>
                        <td>13.54</td>
                        <td>Durnin</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Measures;