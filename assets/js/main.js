const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
  const li = document.createElement('li');
  return li;
}

inputTarefa.addEventListener('keypress', function (e) {  
  if (e.keyCode === 13) {                                
    if (!inputTarefa.value) return;                      
    criaTarefa(inputTarefa.value);
  }
});

function limpaInput() {                                  
  inputTarefa.value = '';
  inputTarefa.focus();                                   
}

function criaBotaoApagar(li) {
  li.innerText += ' ';                                    
  const botaoApagar = document.createElement('button');   
  botaoApagar.innerText = 'Apagar';                       
  // botaoApagar.classList.add('apagar');                 
  botaoApagar.setAttribute('class', 'apagar');            
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(botaoApagar);

}

function criaTarefa(textoInput) {
  const li = criaLi();                                  
  li.innerText = textoInput;                            
  tarefas.appendChild(li);                              
  limpaInput();                                         
  criaBotaoApagar(li);
  salvarTarefas();
  
}


btnTarefa.addEventListener('click', function () {
  if (!inputTarefa.value) return;                     
  criaTarefa(inputTarefa.value);                      
});

document.addEventListener('click', function (e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {              
    el.parentElement.remove();                        
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);                       
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas); 
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas); 

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();

//-----------Timer

function relogio() {
  function criaHoraDosSegundos(segundos) {
    const data = new Date(segundos * 1000);
    return data.toLocaleTimeString('pt-BR', {
      hour12: false,
      timeZone: 'UTC'
    });
  }

  const relogio = document.querySelector('.relogio');
  let segundos = 0;
  let timer;

  function iniciaRelogio() {
    timer = setInterval(function() {
      segundos++;
      relogio.innerHTML = criaHoraDosSegundos(segundos);
    }, 1000);
  }
  
  document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('zerar')) {
      clearInterval(timer);
      relogio.innerHTML = '00:00:00';
      relogio.classList.remove('pausado');
      segundos = 0;
    }

    if (el.classList.contains('iniciar')) {
      relogio.classList.remove('pausado');
      clearInterval(timer);
      iniciaRelogio();
    }

    if (el.classList.contains('pausar')) {
      clearInterval(timer);
      relogio.classList.add('pausado');
    }
  });
}
relogio();

//-----------------------data

const h1 = document.querySelector('.data');
const data = new Date();
h1.innerHTML = data.toString();

function getDiaSemanaTexto(diaSemana) {
    const diasSemana = ['domingo', 'segunda' , 'terça' , 'quarta' , 'quinta' , 'sexta'];
    return diasSemana[diaSemana];
}

function getNomeMes(numeroMes) {
const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezenbro'];
return meses[numeroMes]
}

function zeroAEsquerda (num) {
    return num >= 10 ? num : `0${num}`;
}

function criaData(data) {
    const diaSemana = data.getDay();
    const numeroMes = data.getMonth();
    const nomeDia = getDiaSemanaTexto(diaSemana);
    const nomeMes = getNomeMes(numeroMes);

    return (
        ` ${nomeDia}, ${data.getDate()} de ${nomeMes} de ${data.getFullYear()} ` +
         ` ${zeroAEsquerda(data.getHours())}:${zeroAEsquerda(data.getMinutes())}`
    );
}

h1.innerHTML = criaData(data);