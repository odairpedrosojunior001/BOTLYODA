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
  // Inserindo função com os dias de contagem CDE Digital:

  function calendario_cde(agent){
    var mesContagem = request.body.queryResult.parameters.mes; 
    console.log ('Verificando mes de contagem :' + mesContagem); 
     
    var calenAnual = {'Janeiro':3,'Fevereiro':5,'Março':10,'Abril':13,'Maio':16,'Junho':7 };
    
    var diasCont= calenAnual[mesContagem];      
    console.log ('Dias de contagem:' + diasCont);

    agent.add('Os dias de contagem para o mês de ' + mesContagem + ' são : ' + diasCont );
  }
  
  // Run the proper function handler based on the matched Dialogflow intent name:
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('calendario.cde', calendario_cde);

  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
