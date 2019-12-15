# Comunicação indireta com React-Redux

- Estamos interessado em um paradigma de comunicação específico, comunicação indireta, que dá suporte para aplicativos e serviços.
A essência da comunicação indireta é se comunicar por meio de um intermediário e, assim, não ter qualquer acoplamento direto entre remetente e um ou mais destinatários.

- Acoplamento  diz respeito de interdependência, isto, é, para uma entidade existir, uma outra entidade também deve existir, e vice versa. Buscamos construir sistemas com o mínimo possível interdependências, para que esses possam funcionar independentemente da existência do outro.

- No livro “Padrões de Projeto, Soluções reutilizáveis de software orientado a objetos.” de Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides, é discutidos várias soluções para problemas de acoplamento de softwares orientados a objetos, um deles muito importante para o nosso contexto é o Padrão Observer (274), que trata dependências entre comportamentos e estados de um objeto, através da notificação de observadores de que o estado de um objeto, foi alterado.

- Baseado no conceitos de dependência um-para-muitos entre objetos, podemos pensar em uma interface gráfica com várias representações de um estado de um objetos, podemos pensar em um editor de texto, podemos pensar em um gráfico baseado em uma tabela de dados numéricos, poderíamos gerar n gráficos diferentes usando mesmo conjunto de dados, e que ao alterarmos essa tabela ambos os n gráficos  tivessem que ser atualizados.

- Assim para resolver esse problema poderíamos transformar os objetos que representam os gráficos em observadores do estado de um outro objeto concreto, assim teríamos n visões distintas de um único conjunto dados, mas para isso precisaríamos de um objeto intermediário, onde os observadores precisam estar inscritos para receberem as mudanças do objeto observado, esse objeto intermediário seria responsável por notificará a todos, toda vez que o estado do objeto observado fosse alterado.

- Aqui entra o conceito de indireção, ao invés de mandarmos diretamente as mudanças para os objetos que precisam refletir os estados de um objeto concreto, como uma uma tabela para geração de gráficos, para um objeto que aceita inscrições, e que notifica a todos os inscritos quando ocorre a mudança de um objeto observado por ele.
Uma das aplicações que mais fazem uso desse tipo de padrão, são interfaces gráficas, pois com essa técnica é possível separar a parte lógica de uma aplicação da sua parte de visualização, isto é, poder desconectar o back-end da aplicação do front-end, isso é excepcional, pois agora se por exemplo o back-end venha a falhar, ou se for remoto e ficar off-line, a aplicação não deve perder seus estado nem seu funcionamento.

- Frameworks de desenvolvimento front-end  Web, adotaram esse modelo diretamente na representação dos estados dos componentes da aplicação, muito embora seja possível fazer o mesmo sem o uso dessas ferramentas, implementando o pattern Observer (274), citado acima.
o Facebook criou uma arquitetura para o ReactJs, que é um framework desenvolvido e mantido pela empresa, e que é baseado em javascript, o Flux, introduz um conceito de fluxo unidirecional de dados, onde  um objeto é responsável por recuperar o dados de lojas, algo como repositório central de dados, e transmitir essa mudança aos seus filhos, algo como um intermediário aos observadores, o Padrão flux tem quatro elementos centrais, dos quais o expedidor, lojas e visualizações são nós independentes. 

- Ações:
    - São objetos simples que contém: 
    - Um identificador.
    - Novos dados.
    - Aciona um despacho específico no Expedidor, com uma nova carga útil de dados, como se fosse um destinatário e uma encomenda.

- Expedidor
    - Todos os dados fluem para o expedidor.
    - Centraliza todos os dados.
    - Gerencia o fluxo de dados da aplicação.
    - Recebe ações de um método criador de ações, que podem ou não originar de usuários.
    - Dispara funções de retornos de lojas registradas no expeditor.

 - Lojas:
    - Respondem a quaisquer ações que sejam relevantes para os estados que mantêm.
    - Emitem um eventos para que as visualizações mudem os seus estados.
    - Contém estados e lógica da aplicação.
    - Model do MVC.
    - Porém voltadas a um domínio específico de uma aplicação.

- Visualizações:
    - Podem fazer com que novas ações sejam propagadas, pela interação de usuários.
    - Escutam eventos de mudança de estados que vem de um manipulador de eventos(lojas).
    - Tem seus próprios definidor de estados, para alterar os dados que estão refletindo.
    - O React faz o papel de visão da aplicação com os seus métodos próprios, setState(), forceUpdate(), desencadeando o método render(), para atualizar os objetos renderizados pelo navegador.
    - Usa os métodos públicos nas lojas para obtenção dos novos dados.

- O redux é uma implementação desse padrão e não é exclusiva ao ReactJs, é aplicável a várias outras aplicações em JavaScript, como Veuex para Veu.js, NgRx Angula .js, dentre outros. E basicamente abstrai partes do processo do Flux, e carrega otimizações na implementação do Flux.
Introduz três princípios básicos, fonte única da verdade, o estado de todo o aplicativo é armazenado em uma árvore de objetos com um único armazenamento.
Estado é somente leitura, a única maneira de mudar o estado é emitir uma ação, e um  objeto que descreve o que mudou.

- Alterações são feitas com funções puras, para especificar como árvore de estados é transformada por ações, entenda redutores puros.
Redutores calcula o novo estado com base no estado anterior, esse é um conceito fundamental de programação funcional.

- Refências:
    - Erich Gamma ... [et al.], Padrões de projeto : soluções reutilizáveis de software orientado a objetos. tradução Luiz A. Meirelles
Salgado. – Dados eletrônicos. – Porto Alegre : Bookman, 2007.
    - George Coulouris ... [et al.], Sistemas distribuídos : conceitos e projeto, radução: João Eduardo
Nóbrega Tortello ; revisão técnica: Alexandre Carissimi. – 5. ed. – Porto Alegre : Bookman, 2013.
    - Flux Overview, 05, jul. 2019. Disponível em: <https://facebook.github.io/flux/docs/overview>. Acesso em: 14, dez. 2019.
    - Getting Started with Redux, 02, dez. 2019. Disponível em: <https://redux.js.org/introduction/getting-started>. Acesso em: 14, dez. 2019.
    - Quick Start, 22, jun. 2019. Disponível em: <https://react-redux.js.org/introduction/quick-start>. Acesso em: 14, dez. 2019.
    - Redux Todos Example, 23 abr. 2019. Disponível em: <https://github.com/reduxjs/redux/tree/master/examples/todos>. Acesso em: 14, dez. 2019.
