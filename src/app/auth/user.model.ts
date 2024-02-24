export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _expirationToken: Date
  ) {}

  get getToken() {
    return this._token;
  }
}
