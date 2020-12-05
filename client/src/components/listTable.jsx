// dependencies
import React, { Fragment } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

function ListTable(props) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            props.title.map(title => (
                                <TableCell key={title}>{title}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.data.map((row, i) => (
                            <TableRow key={i}>
                                {
                                    props.keys.map((k) =>
                                        <TableCell key={k} align="right">{row[k]}</TableCell>
                                    )
                                }
                                <TableCell align="right">
                                    {
                                        (props.showOptions.edit || props.showOptions.delete) &&
                                        <Fragment>
                                            {
                                                props.showOptions.edit &&
                                                <Edit onClick={() => props.funcEdit(row)} />
                                            }
                                            {
                                                props.showOptions.delete &&
                                                <Delete onClick={() => props.funcDelete(row)}/>
                                            }                                       
                                        </Fragment>

                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
ListTable.defaultProps = {
    showOptions: {edit: false, delete: false}
};
export default ListTable;