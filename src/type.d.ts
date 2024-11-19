declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";
declare module "*.pdf";
declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "*.graphql" {
  import { DocumentNode } from "graphql";
  const Schema: DocumentNode;
  export = Schema;
}