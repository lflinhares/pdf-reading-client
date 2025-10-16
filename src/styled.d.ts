import 'styled-components';
// Importe o nosso novo tipo Theme do arquivo de tema
import { Theme } from './theme';

declare module 'styled-components' {
  // Agora, estendemos a DefaultTheme com o nosso tipo Theme, o que é sintaticamente correto.
  export interface DefaultTheme extends Theme {}
}