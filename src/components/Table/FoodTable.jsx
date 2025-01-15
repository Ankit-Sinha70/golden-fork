import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Food from "../../assets/images/icon/jpeg/Table/Food.jpeg";
import "./FoodTable.scss";

const FoodTable = (props) => {
  function capitalizeFirstLetter(string) {
    if (!string) return "N/A";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  return (
    <TableContainer className="foodTable" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Food Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{props.tableData?.categoryName}</TableCell>
            <TableCell>{props.tableData?.price} 50 $</TableCell>

            <TableCell className="foodTable__items">
              {props.tableData?.items?.map((item, idx) => (
                <div key={idx} className="foodTable__itemMenu">
                  <img src={Food} alt={item.name} />
                  <div>
                    <div className="foodTable__item">
                      {capitalizeFirstLetter(item.name)}
                    </div>
                    <p>{capitalizeFirstLetter(item.description)}</p>
                  </div>
                </div>
              ))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FoodTable;
