import React from "react";

function tableRow({item}) {
    console.log(item);
  return (
    <tr>
      <th>Num</th>
      <th>{item.item}</th>
      <th>{item.price}</th>
    </tr>
  );
}

export default tableRow;
