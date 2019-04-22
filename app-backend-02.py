import json

from flask import Flask
from flask import request

app = Flask(__name__)

@app.route("/",methods=['POST'])
def hello():

	data = request.get_json(silent=True)

	numero1 = data['queryResult']['parameters']['numero1']
	numero2 = data['queryResult']['parameters']['numero2']
	
	resposta = {
		"fulfillmentText" : "Resposta : " + str(numero1 * numero2)


	}
	return json.dumps(resposta)
    

if __name__== "__main__":
	app.run(debug=True)


