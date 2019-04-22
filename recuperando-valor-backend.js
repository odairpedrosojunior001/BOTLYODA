// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues

'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add('Olá, bem vindo ao bot.');            
  }
    
  function fallback(agent) {
    agent.add('Desculpe não entendi.');    
  }
  // Inserindo mais uma função para responder preço de curso:

  function preco_curso(agent){

    var cursos ={'R':300,'Python':500,'Machine Learning':1000,'Spark':899,'Hadoop':999,'Java':700 };
    
        if (request.body.queryResult.parameters.curso){
    var nomeCurso = request.body.queryResult.parameters.curso; 
    console.log ('Verificando valor do curso' + nomeCurso); 
     
        
    var valorCurso = cursos[nomeCurso];      
    console.log ('Valor do curso:' + valorCurso);

    agent.add('O preço do curso de ' + nomeCurso + ' é ' + valorCurso + ' reais ');
  }
        else{
            agent.add("Qual curso deseja saber o valor ? Temos os cursos :" + Object.keys(cursos));
        }
    }
  
  // Run the proper function handler based on the matched Dialogflow intent /name:
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('preco.curso',preco_curso);

  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
