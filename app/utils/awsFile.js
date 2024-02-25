import { RNS3 } from "react-native-aws3";

const options = {
  keyPrefix: null,
  bucket: "bytbvideo",
  region: "us-east-2",
  accessKey: "AKIAZS42IZL2LBPJ6YMC",
  secretKey: "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",
  successActionStatus: 201,
  acl: "bucket-owner-full-control",
};
export const uploaddocumnetaws = async (data) => {
  return RNS3.put(data, options)
    .then((response) => response.body.postResponse)
    .catch((e) => console.log(e));
};
