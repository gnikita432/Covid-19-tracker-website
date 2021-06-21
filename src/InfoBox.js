import React from "react";

import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBoxes({ title, cases, total }) {
  return (
    <Card>
      <CardContent>
        {/* title -> coronavirus cases */}
        <Typography color="textSecondary">{title}</Typography>
        {/* Number of Cases */}
        <h2 className="infoBox__cases">{cases}</h2>
        {/* Total */}
        <Typography color="textSecondary">{total}</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBoxes;
