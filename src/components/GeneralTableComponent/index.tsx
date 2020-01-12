import React, {
  PropsWithChildren,
} from 'react';
import {
  Props,
  BaseData,
} from './types';
import {
  Container,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import './styles.css';
import {
  useHistory,
} from 'react-router';

export const GeneralTableComponent: <T extends BaseData>(props: PropsWithChildren<Props<T>>) => React.ReactElement = (props) => {
  const history = useHistory();
  return (
    < Container
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        onClick={() => {
          history.push(`${props.route}/new`);
        }}
        variant="contained"
      >Add New</Button>
      <Table aria-label="simple table" className="DataTable">
        <TableHead>
          <TableRow>
            {
              props.tableData.map((data) => (
                <TableCell align="right">{data.title}</TableCell>
              ))
            }
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.data.map(item => {
              const cells: JSX.Element[] = [];
              props.tableData.forEach(key => {
                cells.push(
                  <TableCell align="left">
                    {key.inContent ? item.content.en[key.key as string] : item[key.key]}
                  </TableCell>
                );
              });
              cells.push(
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      history.push(`${props.route}/${item.key}`);
                    }}
                  >Edit</Button>
                </TableCell>
              );
              cells.push(
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this item? (this action is irreversible)')) {
                        props.deleteAction(item.key);
                      }
                    }}
                  >Delete</Button>
                </TableCell>
              );
              return (
                <TableRow key={item.key}>
                  {cells}
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </Container >
  );
}

export default GeneralTableComponent;