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

# pagina header
vamos para a nossa pagina home e vamos criar uma pasta para ela assim fizemos para tudo que tem estilização
e renomear o home para index
vamos fazendo esse index com os elementos que devem aparecer em tela. i formulario o conunt etc. e nglobamos todos eles em uma div ate acharmos algo melhor para englobar.
fazendo o form
colocamos o vou trabalhar em como label para que quando seja clidado ja de focus na parte que o usuario vai preencher (o input).
vamos tambem criar o input e para trabalhar com a label a gente coloca no input o id task e na label htmlfor"task' fazemos outra label para a duração e um span para o fim da frase com a palavra minutos.
abaixo do formulario vamos ter o countdown
* countdown
uma div englobando. 
dois spans para o tempo em minutos
um span para o dos pontos e mais dois spans para os 00 dos segundos.
essas formataçoes depois vão mudar. por enquanto so queremos fazer o visual.
* button
para finalizar vamos er o botão para iniciar parar etc.
esse butão vai dar o submit no form então precisamos que o formulario na verdade fique e volta de tudo, incluse dos spans de tempo e do butão. e por isso tambem vamos envolver as labels e tudo mais do form em uma div para podermos estilizar elas juntas
colocamos no botao o icone do play do phosphor.
a home ficou assim. agora vamos estilizar
import { Play } from 'phosphor-react'

export function Home() {
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="task">Vou trabalhar em</label>
          <input id="task" />

          <label htmlFor="minutesAmount">durante</label>
          <input id="minutesAmount" type="number" />

          <span>minutos.</span>
        </div>

        <div>
          <span>0</span>
          <span>0</span>
          <span>:</span>
          <span>0</span>
          <span>0</span>
        </div>

        <button type="submit">
          <Play size={24} />
          Começar
        </button>
      </form>
    </div>
  )
}


styles home
fazemos as consts para a home container para o form container para o cowntdown container e tambem para o button. la no index no lugar da div que engloba tudo vamos colocar a HomeContainer importando do styles. dentro do form vamos importar a form container dentro do countdown a do countdown e etc
na estilização do homecontainer vamos colocar os basicos de posicionalente e vamos estilizar o form dentro dela. abrindo  tag form{}. nessa estilização a gente alignou o form com o coutwdoan e button ao centro e colocamos um espaçamento neles.
na estilização o form nos fazemos o basico de posicionamento e cor e colocamos um flexwrap. o flexwrap funciona para se a tela for menor ele quebrar o formulario em varias linhas.
para o countDown vamos usar a outra font a roboto mono
vamos criar um componente extilisado apenas para estilizar o dois pontos no meio do countdown. estipizamos ele e trocamos a span que estava entre o : pelo importado sperator.
o overflow hiden que a gete botou é" uma propriedade que determina o comportaento do elemento quando o seu conteudo excede o tamanho da box na qual ele esta inserido. com o hiden o que esceder o tamanho da box não sera mostrado. outras propriedades sao visible scroll e auto.
* button
 a gente poderia estilizar o button dentro do form que esta dentro da main na pagina de estilização. porque o button faz parte do form. seria so colocar a tag button:submit{}. porem ao usar styled componentes é melhor evitar usar muita cascata e sim criar novos componentes estilizados. enão vamos usar o nosso buton que a gente tinha criado. assim 
 export const StartCountdownButton = styled.button``
 e la no index a gente troca a tag button pela startcontdownbutton assim
 <StartCountdownButton type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
        e vamos estilizar ele
      damos um hover e um disabled para o botao tambem e colocamos o hoover para so acontecer se ele não estiver disabled assim
      &:not(disabled):hover{}

* input style
os nossos inputs tem taman,hos diferentes precisamos que um se expanda. por isso temos wq aplicar estilos diferentes
 amos fazer dois componentes estilizados. UM PRA CADA
 como os dois inputs tambem vao ter muita estilização compartilhada a gente pode criar uma const que não vamos importar chamada baseInput que vai ser styled.input os outros dois que vao usar as bases do baseinput nos vamos colocar styled(baseInput). o conjunto fica assim
 const BaseInput = styled.input`
  background: transparent;
`
export const TaskInput = styled(BaseInput)``

export const MinutesAmountInput = styled(BaseInput)``
ou seja criamos um componente de base para estilizar outras coisas
é bom saber que o input não herda o fontsize do container por isso temos que colocar o fontsize nele tambem. outra solução é passar o font-size inherit. que ai ele herda.
apos fazer as configuraçoes de base nos vamos para os inputs especificos
fixamos o tamanho do input minuts q é menor. e para que o outro ocupe o maximo de espaço possivel a gente da pra ele a propriedade flex 1. essa prorpiedade faz com que como o container tem display flex o flex um é um atalho para setar tres propriedade flex o grwoth que fica como sim e da caracteristica de permitir o componente crescer. o flex shrink que da a possibilidade de diminuir e flex bases que é o tamanho ideal do elemento. colocando o 1 ele diz que vai caber no espaço mas vai aumentar o espaço oi diminuir se precisar.
agora voltamos para o input base para estilizar o placeholder com &::placeholer{}
* aprimorando os inputs com html
na parte de minutos por exemplo vamos impedir que ela coloque 999999 e tambem vamos fazer com que ela não precise subir na seta de um em 1.
por exemplo em inputs do tipo numero nos podemos passar para ele o step assim ele sobe em mais de um a um. no html tradicional a gente tem que colocar a propriedade step como uma string, mas no react a gente pode botar como um numero então a gente bota step={5} por exemplo podemos definir os vamores minimos e maxims com a propriedade min e max.
no input de texto podemos colocar sugestoes de coisas que ja digitamos anteriormente.
vamos fazer uma datalist apos o tad de input de texto. passamos um id para damos as options e o id passa para a propriedade list do form. fica assim
<FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="taskSugesion"
          />
          <datalist id="taskSugestion">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Banana" />
          </datalist>
porem isso vai gerar uma flecha feita no textarea . a gente pode tirar isso no css indo no taskInput e coocando um &::-webkit-calendar-picker-indicator{display: none !important;}

#history
vamos fazer nosso historico
na pasta historico abrimos o style.ts tambem
driamos no index uma tabela com o html usando table/ thead tr t e tbody. e vamos estilizar as coisas
a gente criou uma div envolta da tabela pq quando estiver no cel e a tela estiver menor o usuario possa dar scrol na tabela. e para isso a gente estiliza apenas a div que esta em volta da tabela dessa forma
export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;
`
vamos voltar para o history container e abrimos a tag da table para estilizar ela da forma que queremos agora que a div ja estilizou a questão de rolagem. o border collapse serve para quando a gente coloca borda de 1px por exemplo em dois elementos lado a lado ele conta 1px de cada um e fica visualmente uma borda de dois pixeils com o colapse ele conta uma colapsando a outra e fica so uma borda de um px entre eles.

# status
no status tem uma bnolinha que muda de cor caso o status esteja em andamentos, concluido, interrmpido etc. nos vamos adicionar essa bolinha com as cores agora. o status é uma das colunas do historico.
vamos criar um componente novo para a flag do status. mas temos que pensar que quando estamos usando o styled components, cada vez que formos criar um componente novo so porque algo é VISUALMENTE  diferente, não significa que aquilo precisa ser um arquivo novo. a gente pode fazer esse componente dentro do styles.
vamos então criar o componente status

export const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
nos colocamos flex e align itens mesmo dentro do status so tendo um texto, teoricamente não gteria o que alinhar e o que colocar em gap. porem dentro do css podemos adicionar elementos novos com o
* ::before ou ::after
 assim adicionando elementos antes ou depois. e poor isso colocamos a gap.o before e after ficam dentro da tag em questão como a primeira ou a ultima coisa. se a gente quer que ele fique na tela visualmente nos tempos  que passar um conteudo, content="" mesmo que esse content seja em branco.
 com esse before a gente conseguiu criar a bolinha no css
 export const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme['yellow-500']};
  }

  apesar do status ser um comppon,ente de estilo nos podemos repassar propriedades para ele. para isso temos que criar uma interface para ele dizendo que propriedades ele pode receber.
  interface StatusProps {
  statusColor: 'yellow' | 'red' | 'green'
}
e no export const temos que passar o props assim export const Status = styled.div<StatusProps>`

agora temos que ir no index e passar a propriedade para todos os status porque ela é obrigatoria. o index fica assim <Status statusColor="green"> Concluido </Status>

agora vamos criar um objeto para mapear as cores que a gente usou na status props no rgb. e assim ele saber o que o yellow red e green significam. orque por enquanto a bola so esta dando amarela porque ela esta na background color.
como a yellow vem do tema ela tem que ser variavel, por isso ao invez de a gente criar uma cor com o #060606 por exemplo nos vamos usar uma string que vai puxar la do nosso tema a yellow-500 e la na passagem do background do &::before a gente vai ter que passar que o props.theme vai buscar do status_color o que vai ser enviado pelo statusColor. dessa forma: background: ${(props) => props.theme[STATUS_COLOR[props.statusColor]]};

porem para isso funcionar a gente tem que passar o STATUS_COLOR com o "as const" dessa forma
const STATUS_COLOR = {
  yellow: 'yellow-500',
  red: 'red-500',
  green: 'green-500',
} as const
 esse as const significa que a string que esta sendo definida para cada um (yellow green e red) nunca vai mudar. ela sempre terq que ser yellow-500 red-500. porque ai ele verfica se tem essas strings la no default theme e ve que tem. qo contrario de antes que ele via apenas como uma string que poderia estar ou não la.
 agpra podemos mudar tambem o statusColor para dizer para ele que as cores disponiveis vão ser as keys do STATUS_COLOR porque so vao ser essas mesmo que vao ser disponiveis. a interface fica assil
 interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR
}
          
# form
coisas importantes para o formulario
* validação (impedir que valide sem preencher ou preenchendo errado)
* monitorar o preenchimento dos campos

existem dois modelos de trabalho para os formularios o controled e o uncontrold
* controled
manter em tempo real o estado dentro de uma ariavel no componente (um estado) sempre que uma nova informação é escrita a gente atualiza o valor do estado. 
se a gente fosse fazer nossa app nesse formato a gente teria um estado
import { useState } from 'react'

export function Home() {
  const [task, setTask] = useState('')

  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="taskSugestion"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
a gente cria o estado task e faz o onChange na task. asim a cada mudanca a gente pega o target.value desse input e atualiza o setTask.
e o value fica sendo o valor do estado. assim atualizamos vizualmente o valor desse imput para o que foi digitado. caso a gente atualize ou resete os campos ele apagaa o value.
isso é controled component a gente esta monitorando a todo momento e vai atualizando a informação
beneficios - nos temos facilmente ter acesso aos valores quando a gnete fazo submit e podemos por exemplo habilitar o botão assim que algo é digitado na task. o controled component traz fluidez para o app.
maleficios - o react sempre que fazemos atualização de estado provocamos uma nova renderização ou seja quando mudamos lgo no estado o react recalcula todo o conteudo do componente do estado que mudou. então se a gente tiver uma interface com muitas atualizaçoes isso pode fazer com que a app fique mais lenta.

* uncontrolled
nesse modelo a gente busca a informação do valor do input somente quando precisarmos dela.
a gente tiraria o onChange e colocaria dentro da tag form um onSubmit para pegar o estatus usando uma função de handleSubmit
export function Home() {
  function handleSubmit(event){
    event.target.task.value
 
  }
  a gente coloca como parametro da função o evento. e ai a gente pega usando o event.target.task(que é o nome do form).value e ai com isso a gente pega o valor la e podemos trabalhar com ele.
  - vantagens
  a gente ganha em performace
  - desvantagem
  a gente perde fluidez e so tem acess ao valor uma vez que ele é finalizado com o valor submit.

  # biblioteca de formularios
  para fazer os forms funcionarem nos vamos usar uma biblioteca de formularioos do react chamada react hook form
  ela trabalha tanto de forma controled quanto uncontroled.
  temos performace e fluidez ao mesmo tempo.
  a gente vai instalar ela usando o npm i react-hook-form
  agoraimportamos ela na nossa pagina e importamos dentro dela a função useForm 
  vamos chamar essa função dentro da home e essa função devolve um obketo com varias informaçoes que podemos usar para criar nosso formulario. por isso podemos usar da desetruturação nela usando uma const {} = useForm ,e se a gente der um contro espaco a gente consegue ver varias funçoes que a gente pode usar de dentro dela as mais importantes são a register e a handleSubmit
  register - vé um medoto que vai adicionar um input ao nosso form. a gente cria um novo formulario na nossa aplicação.
  vamos pegar os nossos input que ja criamos do nosso formulario, vamos dar um enter depois do ultimo vamos abrir um objeto e dentro dele dar ...register('task') como o register é uma função a gente abre parametros e da um nome para o input, nesse caso escolhemos task.
  agora podemos tirar o name='task' porque ele esta repetido.
  o register é uma fiunção que recebe o nome do input e retorna alguns metodo que sao os metodo que utilizamos para trabalhar com input no javascript como o onChange, o onBlur, onFocus, etc. por ela retornar varios metodos a gente usa o spreadoperator para transofrmar cada metodo que ela retorna em um atributo ou propriedade para podermos usar no input.
  vamos fazer a mesma coisa no minutesAmount mas no segundo argumento a gente pode passar parametro de configuração e um deles é uma propriedade chamada value has number. e com esse ele vai ler o que esta la como um nomber que passamos true ou flase, nesse caso true pq queremos que seja um numero e não como ua string que é o padréo fica assim
   {...register('minutesAmount', { valueAsNumber:true })}
  no nosso formulario na parte de onSubmit nos vamos passar a handleSubmit que veio do useForm
  criamos uma função chamada handleCreateNewCicle.
  e passamos para o handleSubmit que esta dentro do onSubmit a função handleCreateNewCycle
  podemos receber como argumento da função cycle um data e o data ele ja sabe que é o value dos inputs.
  com isso criamos o formulario, mas ainda precisamos fazer o disable para ser interativo.
  para habilitar caso o valor de task for preenchido ou não podemos importar uma função chamada watch. para essa funcção watch nos vamos passar o campo task que foi o nome que demos dentro do register. e se a gente transformar isso em uma const chamada task a gente sabe o valor dela em tempo real. e agora la no botão podemos colocar o disble={!task} se não for task ele vai estar desabilitado. ou task.length != 0 qualquer coisa asim.
  agora a pagina esta funcionando e ela fica assim:
  import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles.js'
import { useForm } from 'react-hook-form'

export function Home() {
  const { register, handleSubmit, watch } = useForm()

  function handleCreateNewCycle(data: any) {}

  const task = watch('task')
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="taskSugestion"
            {...register('task')}
          />
          <datalist id="taskSugestion">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Banana" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={!task} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}

mas podemos ainda criar umas variaveis auxiliares que são variaveis que não vao mudar a funcionalidade nem prejudicar a performance mas ajudam na legibilidade do codigo.
por exemplo a nossa const task = watch('task') a pessoa vai ter que correr ate o fim do cogido para entender porque fizemos isso.
então a gente pode criar uma variavel chamada isSubmitDisabled = !task e la embaixo a gente usa a variavel isSubmitDisable. assim a pessoa que ler vai saber logo quando pegar que essa watchTask é para desabilitar o submit quando a task não estier presente.

# validando formulario
nosso formulario tem o botão desabilitado ate que a pessoa escreva algo. mas podemos tambem deixar o botão habilitado e caso a pessoa não escreva nada valido qo clicar no botão aparecer algo que indique que deve ser preenchido.
o react hook form não traz nada de validação por padrão. ele se mantem uma biblioteca mais enxuta e e utiliza de outras bibliotecas feitas para validaão de forma integrada. 
uma dessas bibliotecas é a yup lib js  outra seria a joi lib js ou a zod lib js
todas muito semelhantes
vamos pegar a zod porque ela se integra um pouco mais com o typescript
npm i zod
e para integrar com o hook form temos que instalar o resolvers dessa forma
npm i @hookform/resolvers
e ai vamos importar o zodResolver nessa integração dessa forma  no index
import { zodResolver } from '@hookform/resolvers/zod'
e vamos tambem importar o zod from zod
mas como o zod não tem o export default a gente tem que importar cada função dele que fossemos usar semaradamente ou então importar tudo e dar um nome para isso com uma tecnica do ecma. ficaria assim
import * as zod from 'zod'
agora nos vamos passar um objeto de configuraçoes para o useForm e nesse objeto nos vamos usar um resolver de validação que é o zodResolver e para dentro do zod resolver a gente tem que passar qual é nosso esquema de validação. por exemplo a gente pode dizer que a task é uma string e precisa ter pelo menos 4 caracteres. o minutosAmount tem que ser um numero maior que 3, e por ai vai. 
para isso vamos criar um objeto chamado newCycleFromValidationSchema = zod.object({}) chamamos de schema porque essas bibliotecas são schemabased que é um formato de validação. é um objeto porque o data vem em formato de objeto.
dentro desse objeto vamos definir o task como um zod.string().min(1, 'informe a tarefa) ou seja é uma string com min,imo de um caracter e o segundo argumento do min é para caso o crequisito minimo não seja validado o que ele vai dar de mensagem para que o usuario entenda. vamos fazer igual para os numeros.
agora que ja temos o esauema de validação vamos passar isso para o zodResolver e ele vai entender isso como necessario para a validação.

# typescript no formulario.
o data do formulario esta como any. ele não consegue inferir qual a tipagem do formulario. a gente pode fazer um interface para isso. mas olhando nosso codigo a gente consegue se ligar que temos o input task que vai ser uma string e o input minutes que vai ser um number. o data vai ser um objeto com esses dois campos. podemos fazer na mão com o interface assim
interface newCycleFormData {
  task: string
  minutesAmount: number
}
e passar essa interface como prom do data que esta na handlenewcycle
ai ja poderemos usar o data.minutesAmount ou data.task.
 
 so que no podemos tambem no useForm passar a propriedade para o objeto de configuração chamado defaultValues; e ela traz a possibilidade de a gente passar o valor inicial de cada campo. para que o useForm saiba que o defaultValue vai estar falando da task e da minutes amount a gente pode passar para ele usando os sinais de maior e menro logo apos ele (um generic) e dentro do generic passar a interface newCycleFormData
 export function Home() {
  const { register, handleSubmit, watch } = useForm<newCycleFormData >({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  }) 
  assim com o em branco no task e o zero no minutes

  agora tem uma interface ja funcionando para esse useForm.
  mas a biblioteca zod tem uma integração boa com o typescript enão podemos ir mais longe.
  so olhando para nossa const newCycleFormValidationSchema a gente consegue ver que vai ter no formulario um campo task que serve para string e um campo minutes que vai ser um number.
  o zod então tem uma funcção dele que consegue extrair desse schema de validação uma tipagem para nosso formulario. dessa forma a gente não precisa criar a interface.
  vamos fazer um type que vai ser igual ao zod.infer<typeOf newCycleValidationSchema> ( o infer que significa que o zod vai inferir o tipp isso automaticamente usando o que temos dentro do newCycleValidadionSchema precisamos usar o typeOf para que o typescript possa entender, porque não é algo nativo do javascript.)
  fica assim a nossa substituição da interface
  type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
  e agora
  // interface newCycleFormData {
// task: string
// minutesAmount: number
// } ficou obsoleto por causa do type extraido do zod.

# reset
um ultimo ponto é que apos a gente clicar em comecar apos preencher o form ele vai disparar o nicio mas os campos do form vao continuar preenchidos.
o react hook form tem uma função chamada reset que é feita para resetar os campos do form a cada vez que o submit seja acionado.
basta a gente colocar a função resert() dentro do createnewcylce e chamando essa função como parametro la na cost que faz o useForm
o reset volta os valores para os valores originais apenas dos campos que a gente colocou no defaultvalue. se a gente não colocar todos os campos no defaultValues ele não vai voltar esses.
export function Home
agora vamos na handleCreateNewCycle e vamos criar um novo cyclo la.() {
  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: newCycleFormData) {
    console.log(data)
    reset()
  }
  fica assim como esta assima o reset sendo chamado como função mas tambem declarado na cosnt do useform. so de colocar isso o reset ja vai funcionar.
  
  # iniciar um novo ciclo
  vamos fazer a funcionalidade de do timmer
  
  a função handlecreatenewcycle precisa de um estado para que refletir que um novo ciclo se iniciou e a interface reaja.
  vamos fazer uma const [ ] = useState() e importar o useState
  vamos criar uma interface para definir o formato dos ciclos que vamos ter. vamos chamar essa interface de cycle
  apesar de nos so termos um ciclo rodando a gente tem varios ciclos que ja rodaram. então é muito importante que a gente tenha um id nessa interface, para poder representar unicamente cada ciclo. nos vamos agora no nosso useState e vamos dizer que ele vai armazenar um array de ciclos com a interface que a gente criou. e vamos iniciar o estado com um array vazio. fica assim
  interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])

  uma solução pra fazer o id é a passar a data no milisegundo e converter para uma string. assim ele fica
    id: String(new Date().getTime())
    depois pegamos o task e minutos amount do data.
    agora damos o setCycles para ser o estado anterior mais o novo.
    fica assim:
    function handleCreateNewCycle(data: newCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...cycles, newCycle])
    reset()
  }
  ja fizermos o estado mas ainda nao estamos usando ele pra nada.
  agora temos que lembrar que temos uma lista de ciclos porem apenas um ativo. temos duas formas de sinalizar qual esta ativo. uma delas é adicionar ao interface uma propriedade chamada isActvie: boolean para indicar se esse é o ciclo ativo. o problema disso é que quando um novo ativo aparecer nos vamos ter que achar o antigo que estava ativo e colocar ele como falso
.
outra alternativa é a gente manter um estado com o id do ciclo ativo
 const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
 a gente coloca compo tipo o string que é o tipo do id, mas tambem o null porque se não tiver nenhum ativo ainda não vai ter nenhum id. e vai ser null. e colocamos para iniciar o estado com null
 agora, quando criamos um novo ciclo na handlecreatenewcycle nos vamos colocar para que i ciclo recem criado seja o ativo. setando o estado com o id do ciclo dessa forma
 function handleCreateNewCycle(data: newCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...cycles, newCycle])
    setActiveCycleId(newCycle.id)
    reset()
  }
  agora para mostrzr o ativo em tela vamos fazer uma nova const
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  essa const vai percorrer o array de estado cycles e vai encontrar um cyclo onde o id dele seja igual ao valor de activeCycleId.
  agora ja temos uma const que vai armazenar qual é o ciclo ativo e assim podemos usar ela.















