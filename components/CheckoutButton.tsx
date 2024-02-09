import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";

const CheckoutButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      className="w-full text-xl"
      size={"lg"}
      type="submit"
      id="checkout-button"
    >
      {pending ? <Loader2Icon className="animate-spin" /> : "Checkout"}
    </Button>
  );
};

export default CheckoutButton;
