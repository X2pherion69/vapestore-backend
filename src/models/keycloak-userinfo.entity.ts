export class KeycloakUserInfo {
  sub: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;

  constructor(
    sub: string,
    email_verified: boolean,
    name: string,
    preferred_username: string,
    given_name: string,
    family_name: string,
    email: string,
  ) {
    this.sub = sub;
    this.email_verified = email_verified;
    this.name = name;
    this.preferred_username = preferred_username;
    this.given_name = given_name;
    this.family_name = family_name;
    this.email = email;
  }
}
