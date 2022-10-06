export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _refresh_token: string,
    private _tokenExpirationDate: Date,
    private _refreshTokenExpirationDate: Date
  ) {
  }

//якщо токен дійсний, повертаємо його, якщо ні то _refresh_token, якщо ні то null
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._refreshTokenExpirationDate) {
      console.log('All tokens finished')
      return null
    } else if (new Date() > this._tokenExpirationDate && new Date() < this._refreshTokenExpirationDate) {
      console.log('token finished')
      return this._refresh_token
    }
    return this._token
  }
}
