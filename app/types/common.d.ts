type SnackMode = "DEFAULT" | "SUCCESS" | "ERROR" | "INFO";

type ImageData = {
  name: string;
  size: number;
  type: string;
  uri: string;
};

type subscriptionType = {
  id: number;
  title: string;
  price: string;
  selected: boolean;
  per: string;
  points: string[];
};
