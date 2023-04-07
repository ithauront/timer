 # styled components
o styled components é uma maneira de estilizar a aplicação usando o css in JS. ou seja escrever o css na sintax do javascript.
temos que istalar o styled components usando o terminal.
usamos o 
npm i styled-components
o styled components não vem com as tipagens dele então se estivermos usando typescript temos que baixar tmb o types
npm i @types/styled-components -D
o -D significa que ele vai vir como dependencia de desenvolvimento.
* para que o styled components serve
- imagina que temos um componente como um butão que vai se repetir varias vezes em tela mas em cada vez vamos precisar de uma pequena alteração na estilização dele. por exemplo as vezes fica verde as vezes vermelho, etc. la no button a gente coloca que ele pode ter cor de 4 formas diferentes e opcionais.
com o css tracicional para estilizar ele a gente teria que fazer um arquivo modules, colocar a classe do butão e estilizar ele. importar os estilos para o app e selecionar ele pela classe. como nos aprendemos antes. o arquivo button ficaria assim
import styles from './button.module.css'

interface ButtonProps {
    color?: 'primary' | 'secondary' | 'danger' | 'success';
}

export function Button (props: ButtonProps) {
    return <button className={styles.button}>Enviar</button>
}

se a gente quiser estilizar por interface da cor teriamos que interpolar na classe tambem isso. o codigo fica assim
import styles from './button.module.css'

interface ButtonProps {
    color?: 'primary' | 'secondary' | 'danger' | 'success';
}

export function Button ({ color = 'primary' }: ButtonProps) {
    return <button className={`${styles.button} ${styles[color]}`} >Enviar</button>
}
como a cor é opcional na exportação temos que colocar como cor basica o primary e na classe nos dizemos que o estilo é o button e depos existe um segundo estilo pra levar em conta que é o array color. ou seja se a gente estilizar primary; secondary danger e succes ele vai pegar uma dessas nesse segundo estilo a depender do que a gente fale que esse butão é no momento de sua utilização. dessa forma.
export function App() {

   return (
    <>
    < Button color="primary" />
    < Button color="secondary" />
    < Button color="success" />
    < Button color="danger" />
    <Button />
    </>
    )

    é muito comum a gente precisar fazer isso no react. estilizaçoes que se baseam em propriedades. e com o styled components tudo isso fica mais simples.

# começar o styled components
precisamos ter a extenção styled components (a verificada) instalada no vscode para poder ver a sintax do css quando formos codar.
vamos trocar obutton.moldule.css por um arquivo javascript. button.styles.ts (não precisa ser tx porque dentro desse arquivo não vai ter nenhum componente e a gente so coloca o tsx se tivermos essa sintax html)  vaùos agora comecar a criar o arquivo bitton
vamos importar o styled do styled component e exportar uma const 
import styled from "styled-components";

export const ButtonContainer = 
o nome da const precisa ter letra maiscula no inicio porque ele tambem é um componente a ser exportado lebra do nome styledComponent.
é um componente react que é abstração de css
nos vaos então dizer que a const é de estilização e dizer qual parte do html vai ser estilizada no caso o button e colocar o template literals (crases) para dentro deles colocar nosso css.
fica assim
export const ButtonContainer = styled.button`
AQUI DENTRO VAI O CODIGO CSS
`
fica assim
export const ButtonContainer = styled.button`
    width: 100px;
    height: 40px;

`
savamos isso e voltamos para o botão.jsx e apagamos o class name e trocamos a tag html button pelo ButtonContainer que criamos no styled. ele vai importar essa tag la do styled. o codigo vai fiar assim
   return < ButtonContainer >Enviar</ButtonContainer >
   a gente poderia agora para as cores usar uma className. porem podemos tambem passar uma propriedade color e passar a color dentro dela assim 
   export function Button ({ variant = 'primary' }: ButtonProps) {
    return < ButtonContainer variant={color} >Enviar</ButtonContainer >
}

como existe uma propriedade nativa chamada color a gente trocou o nome para variant.
vai dar erro porque não existe uma propriedade variant no nosso buttonContainer que tambem é um coponente então vamos la no button.styles.css e vamos criar a interface do ButtonContainer e colocar o variant dentro dele.
existem diferenças entre as interfaces nos estilos a variante não pode ser opcional porque nos não vamos ter como setar a primary como o basico. porem podemos setar um tipo para as cores. exportamos esse tipo e la no arquivo do butão a gente importa ele na nossa interface. alem disso temos que dizer que o nosso buttom CSS vai usar essa interface para isso usamos um <> depois da exportação dele. fica assim
button.styled.css
import styled from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';


interface ButtonContainerProps {
    variant: ButtonVariant;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;

`
button.tsx
import { ButtonContainer, ButtonVariant } from './button.styles';

interface ButtonProps {
    variant?: ButtonVariant
}


como vamos usar agora essas cores para o primary secondary etc.
vamos fazer uma const abaixo do interface com um objeto que vai conter o nome de cada caracteristica (primary secondary etc) e atribuir a elas uma string com o nome de uma cor. apos isso dentro da exportação vamos criar uma interpolação de string. precisamos de uma interpolação porque estamos usando uma string para exportar e o codigo que estiver dentro da interpolação ${} o javascript vai executar como uma função. e queremos que ele envie para essa função as propriedades do buttoncontainer. e vamos falar pra essa função usar o nosso ButtonVariant (ou seja a const que criamos dizendo o que cada cor vai representar) e ela vai usar a props.variant como chave. ou seja o que estiver la no button.tsx dizendo que é a cor (primary por exemplo) vai chegar nessa função e vai fazer ele ler como vamos pegar o que é igual a primary dentro da nosa const que determina isso (a ButtonVariant) e ele vai ler purlple no background-color. o codigo css fica assim
import styled from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';


interface ButtonContainerProps {
    variant: ButtonVariant;
}

const ButtonVariant = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    success: 'green',

}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;

    ${props => {
      return  `background-color: ${ButtonVariant[props.variant]}`   
    }}
`
e o tsx fica assim
import { ButtonContainer, ButtonVariant } from './button.styles';

interface ButtonProps {
    variant?: ButtonVariant
}

export function Button ({ variant = 'primary' }: ButtonProps) {
    return < ButtonContainer variant={variant} >Enviar</ButtonContainer >
}

então o styled componentes traz uma certa complexisdade mas ajuda muitooo quando vamos pensar em componentes que mudam de estilizaçoes diversas vezes. essas mudanças de estilizaçoes se forem todas feitas com classe daria mais trabalho de codificar tudo.

a gente pode colocar um css e importar ele automaticamente do styled componenets para a gente ter a  formataçao do css em nosso styled. o return fica assim:
return  css`background-color: ${ButtonVariant[props.variant]}`   
    }}

## configuarar temas
podemos ter varios temas, geralmente usamos o ligth ou o dark mas no styled a gente ode ter quantos a gente quiser e eles sqao contolados por JS
* dentro da pasta src vamos criar uma pasta chamada styles e dentro dela uma chamada themes dento da themes vamos criar o tema default ou seja padrao.
dentro desse default vamos dar o export const o nome do arquivo e podemos por exemplo setar cores la. dessa forma.
export const defaultTheme = {
    primary: 'purple',
    secondary: 'orange',
    
}
e agora a gente volta para o app. e la importamos do styled components um ThemeProvider que é algo ja embutido do styledComponents desa forma
import { ThemeProvider } from 'styled-components'
e ai dentro dos botoes nos vamos colocar o theme provider. assim o theme so vai ser aplicado para componentes que estiverem dentro do theme provider. podemos colocar ele no lugar do fragment. como ele é um componente ele vai receber uma propriedade chamada theme. e vamos passar para essa theme o nosso default. fica assim:
  return (
    < ThemeProvider theme={defaultTheme}>
    < Button variant="primary" />
    < Button variant="secondary" />
    < Button variant="success" />
    < Button variant="danger" />
    <Button />
    </ ThemeProvider>
    )

    agora na nossa estilização do buttonContainer n button.styles a gente consegue acessar as variaveis que a gente colocou no theme. 
    vamos cimentar os props que tinhamos feito nos butoes no styles.
    vamos dizer que a nossa cor de fundo a gente queira que seja a nossa primaria que cadastramos no theme. a gente consegue acessar isso . fica assim:

    export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;

    background-color: ${ props => props.theme.primary}

`
dessa forma ele vai pegar a background cor o string que esta no theme.primary que no caso é roxo. e vai importar isso e o sistema vai interpretar no lugar certo como uma cor. 
nossa aplicação so vai ter um thema mas vamos entender como faz para mudar de tema aqui.
# mudando de tema.
precisamos de um outro arquivo com as estilizaçoes de um segundo dema la no styles / themes por exemplo um arquivo dark.
no theme provider do arquivo app vamos usar uma funcionalidade para alternar o thema usando por exemplo um estado sendo ativado por exemplo ao clicar um botão.
return (
    < ThemeProvider theme={defaultTheme}>
    trocariamos ao clicar em um botão o default theme para light theme. e ai toda a aplicação troca as cores automaticamente por que elas respondem a isso. mas ai temos que usar os nmes igauis nos dois arquivos.

# tipagem de temas
o styled components não da as sugestoes do que tem dentro la do tema( por exemplo o primary ou secundary) nos podemos fazer isso manualmente criando arquivos de tipagem de temas.
dentro da pasta src vamos criar uma pasta @types ( o nome não precisa ser esse) mas botamos o @ para que ele fique no inicio. e nela vamos criar um arquivo chamado styled.d.ts o d.ts significa que dentro desse artuivo eu so vou ter codigo de definição de tipos de typescript e nada do javascript. ou seja, tipos de interface.
nesse arquivo vamos importar a styled-components
e tambem o nossodefaultTheme do outro arquivo de tema.
se passarmos o mouse no defaultthelme ele ja vai mostrar a tipagem que ele tem.
nessa pagina então vamos fazer o type dele 
fica assim
type ThemeType = typeof defaultTheme
o typeof ja é uma coisa padrão do typescript.
o themetype foi o que escolhemos e o defaulttheme é o nome do arquivo.
assim ele ja sabe que o themetype é o primary = string etc.
isso do styled.d.ts é uma coisa que a gente geralmente faz pouco e não decora. então muitas vezes a gente tem um exempo disso de qlgum projeto que a gente fez e a gente vai copiando sempre que precisa. isso é muito comum na programação reutilizar coisas.
vamos então declarar. essa declaração vai ser para sempre que a gente importar o styled modules ele puxar a tipagem que iremos definir aqui. nos importamos o styled components primeiro e depois declaramos ele de novo porque essa importação traz a maior bagagem dele ai nos precisamos declarar so o que iremos atualizar. se não teriamos que fazer do 0 é meio que como usamos o [...estate, estate] . dentro dessa declaração vamos exportar a interface DefaultTheme e extender ela com o themeType fica assim:

import 'styled-components' ;
import { defaultTheme } from '../styles/themes/default'; 

type ThemeType = typeof defaultTheme

declare module 'styled-components'{
    export interface DefaultTheme extends ThemeType {}
}
 o interface que a gente exporta é o DefaultTheme com D maiusculo que é uma propriedade nativa d styled. 
 

 ## estilo global
 na pasta styles que fica dentro do componentes vamos criar um arquivo chamado global.ts (ts e não css que era o que usavamos até agora.)
 então até os estilos globais vao ser em typescritp usando o styled-components
 vamos importar de dentro do styled-components uma função chamada create global style essa funçé:ao ja faz parte da biblioteca do styled commpoonetns
 vamos exportar um component chamado global style. que é igual ao createGlobalStyle e colocamos as crases e dentro delas todos as estilizaçoes que queemos que sejam globais.
  uma vez que o global style esteja estilizado nos podemos importar ele em qualquer lugar da aplicação que a gente queira.  como por exemplo no app. so é importante que ele esteja dentro da tag do themeProvider para que ele possa aproveitar das variaçoes que iremos fazer com nossos temas. o componente globalstyle pode ser importado em quaquer posição dentro do themeprovider; apos fazer isso o estilo global ja começa a funcionar.

  # cores e fontes

  vamos importar a fonte la do google. selecionamos e colamos o link no nosso index html.
  com isso feito podemos voltar para os estilos globais e definir que pro body input e text vamos usar essas fontes.
    colocamos as fontes e o tamanho padrao e tudo mais no global.
    cores. copiamos as cores todas que vamos usar mla do figma e colocamos elas com nome de variaveis e colocamos elas la no nosso tema default.ts.
    agora com as cores setadas vamos voltar no global.ts e vamos utilizar as cores. e usamos elas usando aquela sintax ${props => props.theme.[gray-900]} por exemplo. fica em [ ] por causa do hifem no meio ai não aceita usar a sintax de . 
    o button tambem deu erro porque ele estava ainda com a cor primary a gente ajustou isso. e ja criamos o estilo de cores e fonte de nossa aplicação.

# ESlint
vamos configurar o ES lint no projeto. isso é um processo que valida que o seu codigo esta seguindo padroes estipulado pelos criadores do projeto. isso é linting. como tem coisas nos codigos que são facultativas, como por exemplo aspas duplas ou aspas simples, colocar ponto e virugla no fim essas coisas. fazendo o linting q gente não precisa se preocupar em seguir o padrão estipulado pela equip, podemos escrever como quisermos queo linting vai transformar isso no padrão que a gente estipular.
temos que baixar a extençãodo eslint
podemos ler a documentação do eslint para entender ele melhor se quisermos mas agora vamos logo instalar ele.
vamos na pasta d projeto no terminal
npm i eslint -D 
assim instala ele como dependencia de desenvolvimento
vamos instalar uma configuração da rocketseat para o eslint
npm i @rocketseat/eslint-config -D
assim vamos usar uma configuração ja existente. mas nos podemos tambem criar a nossa dando o codigo
npx eslint --init
e ai ele vai fazer varias perguntas e nos vamos respondendo para configurar
agora com tudo instalado vamos criar um arquivo dentro da pasta src chamado .esinitrc.json ou .js tato faz.
dentro desse aqruivo vamos simplismente escrever:
{
    "extends": "@rocketseat/eslint-config/react"
}

como vamos testar?
podemos rodar no nosso terminarl o comando
npx eslint src --ext .ts,.tsx
assim ele vai achar o arquivo na sorce e vai procurar em todos os arquivos .ts ou .tsx se tem erros de codigo.
ele vai te mostrar os varios erros; os arquivos no vscode tambem vao começar a mostrar erros. a gente pode ir mudando umpor um ou ir em uma configuraão do vscode.
a gente da cntrl shfp p e pesauisa setings user preference json
la a gente adiciona ao objeto essa linha
"editor.codeActionsOnSave": {"source.fixAll.eslint": true}
isso significa que o editor ao salvar um arquivo vai resolver todos os problemas que o eslint aponta com a solução que ele aponta.
agora podemos ir la no nossos arquivos e ir salvando ele.
da tambem para corrigir todos os erros do projeto inteiro de uma so vez. temos que rodar esse comando 
npx eslint src --ext .ts,.tsx --fix
nos podemos aproveitar e criar um script no package json com esse codigo sem o npx e o fix para que a gente possa rodar o linting sem precisar escrever esse codigo de novo. vamos no pakckage json procuramos os scripts e colocamos "lint" : "eslint src --ext .ts,.tsx"
agora a gente consegue rodar ele so com o comando npm run lint
e para fixar a gente pode dar o npm run lint --fix

# rotas
para lidar com as rotas que são por exemplo se o cliente digitar o site / algo a gente chegar nessa pagina. para isso vamos usar uma biblioteca mais famosa chamada react routes vamos instalar
npm i react-router-dom
vamos criar uma pasta pages dentro de scr e dentro dela vamos criar o arquivo home e o arquivo history ambos tsx
em ambos vamos dar o export funciton
e vamos no app apagar o a chamada do button que nos não vamos utilizar
e vamos criar no src um novo componente chamado router.tsx  a gente poderia escrever ele todo dentro do app mas para separar a definição de rotas vamos colocar ele eme um componente diferente.
vamos fazer a declaração de quais rotas temos na aplicação tambem usando a logica de compoentnes.
vamos esportar a função router
vamos importar os componentes Routes e Route do react roter dom
e dentro da funão vamos retornar a tag routes e dentro dela os route
no route temos que dar como propriedade o path no caso da home vamos comocar so a / e damos o elemento quje vai carregar e colocamos o componente no formato tag fazendo a importação dessa pagina.
fica assim:
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { History } from './pages/History'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}

no console log vai dar erro. temos que corrigir algumas coisas. porque precisamos importar o browser router do reactdom e fazer um wrap do react dom dentro do brouser Router. para fazer isso vamos no app. e importamos o browser router 
e envolvemos toda a aplicação nele. ele pode ir tanto por fora ou por dentro do theme provider nao az diferença o blobal style tambem pode ficar por fora. a coisa que é importante é que o berowser router fique por fora de nossazs rotas.. o app fica assim
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './router'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

e agora la no navegador podemos mudar de pagina usando o /no endereço.

# layout de rotas
na nossa aplicação temos coisas que se repetem visualmente indepen,dete da rota que a pessoa esta acessando.
como por exemplo o header. e se a gente ficar repetindo esses elementos nas diferentes rotas tudo isso vai ser recriado do zero.
vamos criar nosso componente header.
depois vamos crir uma nova pasta chamada layouts
e dentro dela vamos criar o um layout default
nesse layout nos vamos exportar a funão e dentro dela vamos retornar o Header importando ele e abaixo disso vamos colocar nosso conteudo. vai ficar assim
iimport { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export function DefaultLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
nesse caso o conteudo (outlet) é algo mutavel.
e para deixar ele mutavel vamos usaro o componente outlet. que éum espaço para ser inserido um conteudo. ai o react router dom vai saber onde deve posicionar o conteudo especifico de cada pagina.
vamos la no router; e por volta das duas outras rotas colocamos mais uma tag route no singular.
e nesse route vamos passar o path / e o elemento default layot fica assim import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { History } from './pages/History'
import { DefaultLayout } from './layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
nos passamos ele para o / porque queremos aplicar isso para todas as rotas.
se a gente tiver layouts diferentes a gente pode fazer outra route com um path diferente para todas as rotas que tem esse path vao ter um outro layout que podemos criar.
se a gente tiver uma rota dentro da outra vai ser a soma dos paths dela para acessar a filha.

# Header e layout
ccomo todas as paginas vao ter o header e o layout da box cinza em volta delas e a gente ja configutou esse defaultlayout para estar em volta de nossa aplicação agora vamos configurar ele para que ele funone como queremos que funcione em nosso app
por estarmos usando o styled components que é algo que o arquivo de estilo cvai estar separado do arquivo do component podemos criar uma pasta chamada defaault layout dentro da pasta layout para juntar o arquivo e seu estilo na mesma pasta. mas isso é opcionl todo o esquema de pastas é sempre opcional. nesse caso podemos chamar o componente de layout que esta nessa pagina de index e o de estilização de styles; todo arquivo que tenha dependecia do defaultlayout eles vao estar nessa pagina./
o styhles vai ser um styled component e vai seguir o padrão de um
e nele vamos criar um componente estilizado chamado layoutContainer (o nome tanto faz)
vamos estilizar no styles e no index nos vamos importar ele e colocar por volta do que tinhamos na div. e temos tambem que atualizar o local do header porque colocamos mais uma pasta.
importamos o phospor e pegamos o icone do ignite do figma.
nos colocamos ma border transparent nos icones. isso é para que quando a gente de o hoover ela possa mudar de cor. no natural ela não é visivel
nos colocamos essa border tanto no top quanto no bottom em transparente porque se não ele joga o icone um pouco pra cima. e acho que se a gente colocar so no hover e não ela transparente sempre estando la tambem vai acontecer isso. colocamos no top tambem para eme ficar centralizado.
estilizamos os icones porem eles não estao mandando para lugar nenhum
vamos na no header e vamos modificar a ancora do link por um componente do reactDom que manda para o local. que é o navlink no lugar do a e to no lugar do href fica assim
   <NavLink to="/">
          <Timer size={24} />
        </NavLink>
    como o navink não diz nada para a acessibilidade a gente geralmente coloca um title com para onde ele vai.
    o ultimo ponto é que o navLink é que ele por baixo dos panos coloca uma classe chamada active que diz em qual pagina voce estae um ariacurent 'page' 
    podemos usar esse active para fazer uma estilização do link. no caso vamos colocar um green-500 na classe active. isso quer dizer que o icone da pagina em que estivermos vai ficar verde.
    se ligar que o &:hover e o &.active tem que ficar dentro da tag de estilização do a. 








