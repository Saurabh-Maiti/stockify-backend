export class Utils {
  static generatePassword(length: number = 6): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let password = '';

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * chars.length);
      password += chars[index];
    }

    return password;
  }
}
