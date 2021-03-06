import React from "react";
import {connect} from 'react-redux';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let isEmpty = true;
        const points =  this.props.points.slice(0, this.props.points.length);
        points.reverse();
        if (points.length !== 0) {
            isEmpty = false;
        }
        const table = <table className="Table">
            <tbody>
            <tr>
                <th>
                    x
                </th>
                <th>
                    y
                </th>
                <th>
                    r
                </th>
                <th>
                    Результат
                </th>
            </tr>
            {points.map(
                (point, i) =>
                    <tr key={i}>
                        <td>
                            {point.x}
                        </td>
                        <td>
                            {point.y}
                        </td>
                        <td>
                            {point.r}
                        </td>
                        <td>
                            {point.result===1?"В зоне" : "Не в зоне"}
                        </td>
                    </tr>
            )}
            </tbody>
        </table>;
        return (<div>{!isEmpty && table}</div>);
    }
}