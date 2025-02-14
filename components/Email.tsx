import * as React from "react";
import { Html, Button, Text } from "@react-email/components";

const Email = ({ url, message }: { url: string; message: string }) => {
  return (
    <Html lang="en">
      <Text>{message}</Text>
      <Button href={url}>click here to website</Button>
    </Html>
  );
};

export default Email;
