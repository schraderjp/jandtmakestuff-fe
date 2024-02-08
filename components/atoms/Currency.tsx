import React from "react";

const Currency = ({
  number,
  currency,
}: {
  number: number;
  currency: string;
}) => {
  const formatAsCurrency = (number: number, currency: string) => {
    const currencyFormat = new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: currency,
    });

    return currencyFormat.format(number);
  };

  return <>{formatAsCurrency(number, currency)}</>;
};

export default Currency;
