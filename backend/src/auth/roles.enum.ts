import { registerEnumType } from "type-graphql";

export enum Role {
  ADMIN = "ADMIN",
  AUTHOR = "AUTHOR",
  USER = "USER",
}

registerEnumType(Role, {
  name: "Role", // doit correspondre au type GraphQL
  description: "Les rôles d'un utilisateur",
});


