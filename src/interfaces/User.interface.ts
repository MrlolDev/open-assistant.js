export default interface User {
  id: string;
  display_name: string;
  auth_method: 'discord' | 'local';
}
